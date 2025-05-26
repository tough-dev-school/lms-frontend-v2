<script lang="ts" setup>
  import VExistingAnswer from './VExistingAnswer.vue';
  import { useHomeworkAnswerQuery } from '@/query';

  const props = defineProps<{
    answerId: string;
  }>();

  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);
</script>

<template>
  <VExistingAnswer v-if="answer" :answer="answer" />
  <div v-else>Loading...</div>
</template>
