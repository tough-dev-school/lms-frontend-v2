<script setup lang="ts">
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import { computed } from 'vue';
  import { generateHTML } from '@tiptap/vue-3';
  import { getExtensions } from '@/utils/tiptap';
  import type { Answer } from '@/api/generated/types';

  const props = defineProps<{
    answer: Answer;
  }>();

  const html = computed(() => {
    if (!props.answer.content || Object.keys(props.answer.content).length === 0)
      return props.answer.legacy_text;

    return generateHTML(
      props.answer.content,
      getExtensions({ placeholder: '' }),
    );
  });
</script>

<template>
  <VHtmlContent :html="html" />
</template>
