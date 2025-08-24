<script setup lang="ts">
  import VHtmlContent from '../VHtmlContent/VHtmlContent.vue';
  import { marked } from 'marked';
  import { computed } from 'vue';

  const props = defineProps<{
    markdown: string;
  }>();

  const html = computed(() => {
    return marked.parse(props.markdown);
  });
</script>

<template>
  <VHtmlContent :html="html" />
</template>
