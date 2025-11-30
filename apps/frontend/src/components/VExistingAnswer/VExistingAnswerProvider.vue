<script lang="ts" setup>
  import VExistingAnswer from './VExistingAnswer.vue';
  import {
    useHomeworkAnswersRetrieve,
    useUsersMeRetrieve,
  } from '@/api/generated/hooks';
  import { computed } from 'vue';

  const props = defineProps<{
    answerId: string;
  }>();

  const emit = defineEmits<{
    'after-create': [slug: string];
  }>();

  const { data: answer } = useHomeworkAnswersRetrieve(
    computed(() => props.answerId),
  );
  const { data: user } = useUsersMeRetrieve();
</script>

<template>
  <VExistingAnswer
    v-if="answer && user"
    :answer="answer"
    :user="user"
    @after-create="(slug) => emit('after-create', slug)"
  />
  <div v-else>Loading...</div>
</template>
