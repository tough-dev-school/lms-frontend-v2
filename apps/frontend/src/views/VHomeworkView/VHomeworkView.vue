<script lang="ts" setup>
  import { toRef } from 'vue';
  import { useHomeworkRedirect } from '@/views/VHomeworkView/useHomeworkRedirect';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
  import VHomeworkQuestionView from './VHomeworkQuestionView.vue';

  const props = defineProps<{
    questionId: string;
    answerId?: string;
  }>();

  const { isRedirecting } = useHomeworkRedirect(
    toRef(props, 'questionId'),
    toRef(props, 'answerId'),
  );
</script>

<template>
  <VLoadingView v-if="isRedirecting" />
  <component
    :is="answerId ? VHomeworkAnswerView : VHomeworkQuestionView"
    v-else
    :question-id="questionId"
    :answer-id="answerId"
  />
</template>
