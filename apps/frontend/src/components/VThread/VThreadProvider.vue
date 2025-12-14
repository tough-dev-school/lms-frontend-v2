<script lang="ts" setup>
  import {
    useUsersMeRetrieve,
    useHomeworkAnswersRetrieve,
  } from '@/api/generated/hooks';
  import { computed, watch } from 'vue';
  import VThread from './VThread.vue';
  import { usePopulateAnswersCache } from '@/composables/usePopulateAnswersCache';

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

  const populateAnswersCache = usePopulateAnswersCache();

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCache(answer.value);
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
