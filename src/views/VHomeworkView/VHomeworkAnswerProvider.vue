<script lang="ts" setup>
  import VHomeworkAnswer from './VHomeworkAnswer.vue';
  import { useHomeworkQuestionQuery } from '@/query';
  import { useHomeworkAnswerQuery } from '@/query';
  import { useUserQuery } from '@/query';
  import { watch, computed } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { populateAnswersCacheFromDescendants } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useLessonsQuery } from '@/query';

  const queryClient = useQueryClient();

  const props = defineProps<{
    questionId: string;
    answerId: string;
    breadcrumbs: Breadcrumb[];
  }>();

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(props.questionId);
  const { data: answer, isLoading: isAnswerLoading } = useHomeworkAnswerQuery(
    props.answerId,
  );

  const { data: lessons, isLoading: isLessonsLoading } = useLessonsQuery(
    question.value?.breadcrumbs.module.id,
  );

  const lesson = computed(() => {
    return lessons.value?.find(
      (lesson) => lesson.id === question.value?.breadcrumbs.lesson?.id,
    );
  });

  const { data: user, isLoading: isUserLoading } = useUserQuery();

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );
</script>

<template>
  <template v-if="question && answer && user">
    <VHomeworkAnswer
      :breadcrumbs="breadcrumbs"
      :question="question"
      :answer="answer"
      :user="user"
      :lesson="lesson" />
  </template>
  <VLoggedLayout
    v-else
    :is-loading="
      isQuestionLoading || isAnswerLoading || isUserLoading || isLessonsLoading
    ">
  </VLoggedLayout>
</template>
