<script lang="ts" setup>
  import { useHomeworkAnswerQuery } from '@/query';
  import VAnswer from './VAnswer.vue';

  const props = defineProps<{
    answerId: string;
  }>();

  const { data: answer } = useHomeworkAnswerQuery(props.answerId);
</script>

<template>
  <VAnswer v-if="answer" :answer="answer" />
  <div v-else>Loading...</div>
</template>
