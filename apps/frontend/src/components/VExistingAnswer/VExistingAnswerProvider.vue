<script lang="ts" setup>
  import VExistingAnswer from './VExistingAnswer.vue';
  import { useHomeworkAnswerQuery, useUserQuery } from '@/query';

  const props = defineProps<{
    answerId: string;
  }>();

  const emit = defineEmits<{
    'after-create': [slug: string];
  }>();

  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);
  const { data: user } = useUserQuery();
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
