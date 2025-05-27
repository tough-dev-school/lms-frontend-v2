<script lang="ts" setup>
  import { useHomeworkAnswerQuery } from '@/query';
  import VAnswer from './VAnswer.vue';
  import { useUserQuery } from '@/query';

  const props = defineProps<{
    answerId: string;
  }>();

  const { data: user } = useUserQuery();
  const { data: answer } = useHomeworkAnswerQuery(props.answerId);
</script>

<template>
  <VAnswer v-if="answer && user" :user="user" :answer="answer" />
  <div v-else>Loading...</div>
</template>
