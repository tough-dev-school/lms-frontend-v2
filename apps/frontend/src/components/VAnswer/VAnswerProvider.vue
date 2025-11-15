<script lang="ts" setup>
  import {
    useHomeworkAnswersRetrieve,
    useUsersMeRetrieve,
  } from '@/api/generated/hooks';
  import VAnswer from './VAnswer.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    answerId: string;
  }>();

  const { data: user } = useUsersMeRetrieve();
  const { data: answer } = useHomeworkAnswersRetrieve(
    computed(() => props.answerId),
  );
</script>

<template>
  <VAnswer
    v-if="answer && user"
    :user="user"
    :answer="answer"
  />
  <div v-else>Loading...</div>
</template>
