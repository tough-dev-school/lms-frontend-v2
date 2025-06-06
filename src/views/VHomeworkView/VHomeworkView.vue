<script lang="ts" setup>
  import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
  import VHomeworkQuestionView from './VHomeworkQuestionView.vue';

  defineProps<{
    questionId: string;
    answerId?: string;
  }>();
</script>

<template>
  <component
    :is="answerId ? VHomeworkAnswerView : VHomeworkQuestionView"
    :question-id="questionId"
    :answer-id="answerId" />
</template>
