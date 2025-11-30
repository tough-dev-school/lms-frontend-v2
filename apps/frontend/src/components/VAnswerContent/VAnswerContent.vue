<script setup lang="ts">
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { computed } from 'vue';
  import { generateHTML } from '@tiptap/vue-3';
  import { getExtensions } from '@/utils/tiptap';
  import type { Answer, AnswerTree } from '@/api/generated/types';

  const props = defineProps<{
    answer: Answer | AnswerTree;
  }>();

  const html = computed(() => {
    if (
      'content' in props.answer &&
      props.answer.content &&
      Object.keys(props.answer.content).length > 0
    ) {
      return generateHTML(
        props.answer.content,
        getExtensions({ placeholder: '' }),
      );
    } else if ('legacy_text' in props.answer && props.answer.legacy_text) {
      return props.answer.legacy_text;
    }

    throw new Error('Answer content not found');
  });
</script>

<template>
  <VHtmlContent :html="html" />
</template>
