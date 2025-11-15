<script lang="ts" setup>
  import {
    useUsersMeRetrieve,
    useHomeworkAnswersRetrieve,
    homeworkAnswersRetrieveQueryKey,
  } from '@/api/generated/hooks';
  import { computed, watch } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import VThread from './VThread.vue';
  import type { AnswerTree } from '@/api/generated/types';

  const queryClient = useQueryClient();
  const props = defineProps<{
    answerId: string;
  }>();

  const emit = defineEmits<{
    update: [answerId: string];
  }>();

  const { data: user } = useUsersMeRetrieve();
  const { data: answer } = useHomeworkAnswersRetrieve(
    computed(() => props.answerId),
  );

  const populateAnswersCacheFromDescendants = (rootAnswer: AnswerTree) => {
    const flatAnswers: AnswerTree[] = [];

    const populate = (a: AnswerTree) => {
      flatAnswers.push(a);

      if (a.descendants.length) a.descendants.forEach(populate);
    };

    populate(rootAnswer);

    flatAnswers.forEach((a) => {
      queryClient.setQueryData(homeworkAnswersRetrieveQueryKey(a.slug), answer);
    });
  };

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(answer.value);
      }
    },
  );
</script>

<template>
  <VThread
    v-if="answer && user"
    :answer="answer"
    :user="user"
    @update="(slug: string) => emit('update', slug)"
  />
  <div v-else>Loading...</div>
</template>
