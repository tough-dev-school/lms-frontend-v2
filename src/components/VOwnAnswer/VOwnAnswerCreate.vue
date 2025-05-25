<script lang="ts" setup>
  import VSendOwnAnswer from '@/components/VSendOwnAnswer/VSendOwnAnswer.vue';

  const props = defineProps<{
    questionId: string;
    parentId?: string;
  }>();

  const emit = defineEmits<{
    save: [text: string];
  }>();
</script>

<template>
  <VSendOwnAnswer
    :draft-key="[questionId, parentId]"
    @send="emit('save', $event)" />
</template>
