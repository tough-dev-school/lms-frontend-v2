<script lang="ts" setup>
  import { useUserQuery, useHomeworkAnswerQuery , populateAnswersCacheFromDescendants  } from '@/query';
    import { watch } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
    import VThread from './VThread.vue';

  const props = defineProps<{
    answerId: string;
  }>();
  const emit = defineEmits<{
    update: [answerId: string];
  }>();
  const queryClient = useQueryClient();
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
  <VThread
    v-if="answer && user"
    :answer="answer"
    :user="user"
    @update="(slug) => emit('update', slug)"
  />
  <div v-else>Loading...</div>
</template>
