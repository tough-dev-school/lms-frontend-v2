<script lang="ts" setup>
  import VHomeworkQuestion from './VHomeworkQuestion.vue';
  import { useHomeworkQuestionQuery } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';

  const props = defineProps<{
    questionId: string;
    breadcrumbs: Breadcrumb[];
  }>();

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(props.questionId);
</script>

<template>
  <VLoggedLayout
    :title="question?.name"
    :breadcrumbs="breadcrumbs"
    :is-loading="isQuestionLoading">
    <template v-if="question">
      <VHomeworkQuestion :question="question" />
    </template>
  </VLoggedLayout>
</template>
