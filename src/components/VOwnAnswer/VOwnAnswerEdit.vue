<script lang="ts" setup>
  import VSendOwnAnswer from '@/components/VSendOwnAnswer/VSendOwnAnswer.vue';
  import { useHomeworkAnswerQuery } from '@/query';

  const props = defineProps<{
    answerId: string;
    questionId: string;
    parentId?: string;
  }>();

  const emit = defineEmits<{
    save: [text: string];
  }>();

  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);
</script>

<template>
  <VSendOwnAnswer
    v-if="answer"
    :initial-text="answer.text"
    :draft-key="[questionId, parentId, answerId]"
    @send="emit('save', $event)" />
</template>
