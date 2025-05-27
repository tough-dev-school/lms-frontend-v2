<script lang="ts" setup>
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VHomeworkQuestion from './VHomeworkQuestion.vue';
  import VHomeworkAnswer from './VHomeworkAnswer.vue';
  import { computed } from 'vue';
  import { useRouteQuery, useRouteParams } from '@vueuse/router';
  import {
    useHomeworkAnswerQuery,
    useHomeworkQuestionQuery,
    populateAnswersCacheFromDescendants,
    fetchHomeworkAnswer,
    fetchHomeworkAnswers,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import { watch, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserQuery } from '@/query';

  const answerId = useRouteQuery<string | undefined>('answerId');
  const questionId = useRouteParams<string>('questionId');

  const router = useRouter();
  const route = useRoute();
  const queryClient = useQueryClient();

  const { data: user } = useUserQuery();
  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(questionId);
  const { data: answer, isLoading: isAnswerLoading } =
    useHomeworkAnswerQuery(answerId);

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );

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

  onBeforeMount(async () => {
    const queryClient = useQueryClient();

    if (route.query.answerId) {
      try {
        await fetchHomeworkAnswer(queryClient, {
          answerId: route.query.answerId as string,
        });
      } catch {
        router.push({
          ...route,
          query: { ...route.query, answerId: undefined },
        });
      }
    } else {
      const answers = await fetchHomeworkAnswers(queryClient, {
        questionId: route.params.questionId as string,
        authorId: user.value?.uuid,
      });

      if (answers && answers.length > 0) {
        router.push({
          ...route,
          query: {
            ...route.query,
            answerId: answers[0]?.slug,
          },
        });
      }
    }
  });
</script>

<template>
  <VLoggedLayout
    :title="question?.name"
    :breadcrumbs="breadcrumbs"
    :is-loading="isQuestionLoading || isAnswerLoading">
    <template v-if="question">
      <VHomeworkAnswer
        v-if="answer && question && user"
        :question="question"
        :answer="answer"
        :user="user" />
      <VHomeworkQuestion v-else :question="question" />
    </template>
  </VLoggedLayout>
</template>
