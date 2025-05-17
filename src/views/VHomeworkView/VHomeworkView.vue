<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import { computed, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import { useRouteQuery, useRouteParams } from '@vueuse/router';
  import {
    useHomeworkAnswersQuery,
    useHomeworkCrosschecksQuery,
    useHomeworkQuestionQuery,
    useHomeworkCommentsQuery,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  const route = useRoute();
  const router = useRouter();

  const answerId = useRouteQuery<string | undefined>('answerId');
  const questionId = useRouteParams<string>('questionId');

  const queryClient = useQueryClient();

  const { data: question } = useHomeworkQuestionQuery(questionId);
  const { data: answers } = useHomeworkAnswersQuery(questionId);
  const { data: comments } = useHomeworkCommentsQuery(answerId, queryClient);
  const { data: crosschecks } = useHomeworkCrosschecksQuery(questionId);

  const answer = computed(() => answers.value?.at(-1));

  const prepareForScroll = (slug: string) => {
    router.push({ name: route.name, hash: `#${slug}` });
  };

  const answerLink = computed(() => {
    if (answerId.value) {
      const url = new URL(`${window.location.href}/homework/${questionId}`);
      url.searchParams.set('answerId', answerId.value);
      return url.toString();
    }
    return undefined;
  });
</script>

<template>
  <VLoggedLayout>
    <section class="flex flex-col gap-24">
      <div v-if="answer" class="card mb-16 bg-accent-green">
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
        <VHeading tag="h1">{{ question.name }}</VHeading>
        <VHtmlContent :content="question.text" />
      </template>
      <VOwnAnswer :answer-id="answer?.slug" :question-id="questionId" />
    </section>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <VHeading tag="h2">Коментарии вашей работы</VHeading>
      <VFeedbackGuide />
      <!-- <VOwnAnswer
        :question-id="questionId"
        :parent-id="answerId"
        @invalidate="prepareForScroll" /> -->
      <VCrossChecks v-if="crosschecks" :crosschecks="crosschecks" />
      <VThread
        v-for="comment in comments[0].descendants"
        :key="comment.slug"
        :answer-id="comment.slug" />
      <pre>{{ JSON.stringify(comments, null, 2) }}</pre>
    </section>
  </VLoggedLayout>
</template>
