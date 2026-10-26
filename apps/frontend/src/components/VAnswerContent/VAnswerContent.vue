<script setup lang="ts">
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { computed } from 'vue';
  import { tiptapToHtml } from '@/utils/tiptapHtml';
  import type { Answer, AnswerTree } from '@/api/generated';

  const props = defineProps<{
    answer: Answer | AnswerTree;
  }>();

  const html = computed(() => {
    if (
      'content' in props.answer &&
      props.answer.content &&
      Object.keys(props.answer.content).length > 0
    ) {
      return tiptapToHtml(props.answer.content);
    } else if ('legacy_text' in props.answer && props.answer.legacy_text) {
      return props.answer.legacy_text;
    }

    throw new Error('Answer content not found');
  });
</script>

<template>
  <VHtmlContent
    :html="html"
    :enable-lightbox="true"
    :group="answer.slug"
  />
</template>
