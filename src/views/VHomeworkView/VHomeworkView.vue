<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import { computed } from 'vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import { useRouteQuery, useRouteParams } from '@vueuse/router';
  import {
    useHomeworkAnswerQuery,
    useHomeworkCrosschecksQuery,
    useHomeworkQuestionQuery,
    useHomeworkAnswerCreateMutation,
    populateAnswersCacheFromDescendants,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import VSendOwnAnswer from '@/components/VSendOwnAnswer/VSendOwnAnswer.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import { watch } from 'vue';
  import useUser from '@/stores/user';

  const answerId = useRouteQuery<string | undefined>('answerId');
  const questionId = useRouteParams<string>('questionId');

  const queryClient = useQueryClient();
  const user = useUser();
  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(questionId);
  const { data: answer, isLoading: isAnswersLoading } =
    useHomeworkAnswerQuery(answerId);
  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );
  const { data: crosschecks, isLoading: isCrosschecksLoading } =
    useHomeworkCrosschecksQuery(questionId);

  const isLoading = computed(() => {
    return (
      isQuestionLoading.value ||
      isAnswersLoading.value ||
      isCrosschecksLoading.value
    );
  });

  const answerLink = computed(() => {
    if (answerId.value) {
      const url = new URL(`${window.location.href}/homework/${questionId}`);
      url.searchParams.set('answerId', answerId.value);
      return url.toString();
    }
    return undefined;
  });

  const { mutate: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);

  const handleCreateComment = (text: string) => {
    createAnswerMutation({
      text,
      questionId: questionId.value,
      parentId: answerId.value,
    });
  };

  const breadcrumbs = computed(() =>
    question.value
      ? [
          {
            name: question.value.breadcrumbs.course.name,
            to: {
              name: 'modules',
              params: {
                courseId: question.value.breadcrumbs.course.id,
              },
            },
          },
          {
            name: question.value.breadcrumbs.module.name,
            to: {
              name: 'lessons',
              params: {
                courseId: question.value.breadcrumbs.course.id,
                moduleId: question.value.breadcrumbs.module.id,
              },
            },
          },
          {
            name: question.value.name,
            to: {
              name: 'homework',
              params: {
                questionId: questionId.value,
              },
            },
          },
        ]
      : undefined,
  );
</script>

<template>
  <VLoggedLayout :breadcrumbs="breadcrumbs" :is-loading="isLoading">
    <section class="flex flex-col gap-24">
      <div
        v-if="answer && answer.author === user.uuid"
        class="card mb-16 bg-accent-green">
        <VHeading tag="h3" class="mb-8">
          Поделитесь ссылкой на сделанную домашку
        </VHeading>
        <div
          class="block select-all"
          :to="{
            name: 'homework-answer',
            params: {
              answerId: answer.slug,
            },
          }">
          {{ answerLink }}
        </div>
      </div>
      <template v-if="question">
        <template v-if="answer">
          <VDetails>
            <template #summary>
              {{ question.name }}
            </template>
            <VHtmlContent :content="question.text" />
          </VDetails>
        </template>
        <template v-else>
          <VHeading tag="h1">{{ question.name }}</VHeading>
          <VHtmlContent :content="question.text" />
        </template>
      </template>
      <VOwnAnswer :answer-id="answer?.slug" :question-id="questionId" />
    </section>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <VHeading tag="h2">Коментарии вашей работы</VHeading>
      <VFeedbackGuide />
      <VSendOwnAnswer
        :draft-key="[questionId, answerId]"
        @send="handleCreateComment" />
      <VCrossChecks v-if="crosschecks" :crosschecks="crosschecks" />
      <template v-if="answer.descendants">
        <VThread
          v-for="comment in answer.descendants"
          :key="comment.slug"
          :answer-id="comment.slug" />
      </template>
    </section>
  </VLoggedLayout>
</template>
