<script lang="ts" setup>
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VHomeworkQuestion from './VHomeworkQuestion.vue';
  import VHomeworkAnswer from './VHomeworkAnswer.vue';
  import { computed } from 'vue';
  import { useRouteQuery, useRouteParams } from '@vueuse/router';
  import {
    useHomeworkAnswerQuery,
    useHomeworkCrosschecksQuery,
    useHomeworkQuestionQuery,
    useHomeworkAnswerCreateMutation,
    populateAnswersCacheFromDescendants,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import { watch } from 'vue';
  import useUser from '@/stores/user';
  import { useRouter } from 'vue-router';

  const answerId = useRouteQuery<string | undefined>('answerId');
  const questionId = useRouteParams<string>('questionId');

  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUser();

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(questionId);
  const { data: answer, isLoading: isAnswersLoading } =
    useHomeworkAnswerQuery(answerId);
  const { data: crosschecks, isLoading: isCrosschecksLoading } =
    useHomeworkCrosschecksQuery(questionId);

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );

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

  const { mutateAsync: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);

  const handleCreateComment = async (text: string) => {
    const answer = await createAnswerMutation({
      text,
      questionId: questionId.value,
      parentId: answerId.value,
    });

    router.push({
      ...router.currentRoute.value,
      hash: `#${answer.slug}`,
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

  const handleCreateAnswer = (answerId: string) => {
    router.push({
      name: 'homework',
      params: {
        questionId: questionId.value,
      },
      query: {
        answerId,
      },
    });
  };

  const handleDeleteAnswer = () => {
    router.push({
      name: 'homework',
      params: {
        questionId: questionId.value,
      },
    });
  };
</script>

<template>
  <VLoggedLayout
    :title="question?.name"
    :breadcrumbs="breadcrumbs"
    :is-loading="isLoading">
    <template v-if="question">
      <VHomeworkAnswer
        v-if="answer"
        :question="question"
        :answer="answer"
        :crosschecks="crosschecks || []"
        :question-id="questionId"
        :answer-id="answer.slug || ''"
        :answer-link="answerLink"
        :is-own-answer="answer.author.uuid === user.uuid"
        @comment="handleCreateComment"
        @delete="handleDeleteAnswer" />
      <VHomeworkQuestion
        v-else
        :question="question"
        :question-id="questionId"
        @create="handleCreateAnswer"
        @delete="handleDeleteAnswer" />
    </template>
  </VLoggedLayout>
</template>
