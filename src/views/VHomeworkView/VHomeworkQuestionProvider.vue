<script lang="ts" setup>
  import VHomeworkQuestion from './VHomeworkQuestion.vue';
  import { useHomeworkQuestionQuery, useLessonsQuery } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    questionId: string;
    breadcrumbs: Breadcrumb[];
  }>();

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(props.questionId);

  const { data: lessons, isLoading: isLessonsLoading } = useLessonsQuery(
    question.value?.breadcrumbs.module.id,
  );

  const lesson = computed(() => {
    return lessons.value?.find(
      (lesson) => lesson.id === question.value?.breadcrumbs.lesson?.id,
    );
  });
</script>

<template>
  <template v-if="question && !isLessonsLoading">
    <VHomeworkQuestion
      :breadcrumbs="breadcrumbs"
      :question="question"
      :lesson="lesson" />
  </template>
  <VLoggedLayout v-else :is-loading="isQuestionLoading || isLessonsLoading">
  </VLoggedLayout>
</template>
