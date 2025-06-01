<script lang="ts" setup>
  import { useUserQuery } from '@/query';
  import { useHomeworkAnswerQuery } from '@/query';
  import { watch } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { populateAnswersCacheFromDescendants } from '@/query';
  import VThread from './VThread.vue';

  const queryClient = useQueryClient();
  const props = defineProps<{
    answerId: string;
  }>();

  const { data: user } = useUserQuery();
  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);
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
  <VThread v-if="answer && user" :answer="answer" :user="user" />
  <div v-else>Loading...</div>
</template>
