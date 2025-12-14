<script setup lang="ts">
  import VHtmlContent from '../VHtmlContent/VHtmlContent.vue';
  import { marked } from 'marked';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      markdown: string;
      enableLightbox?: boolean;
      group?: string;
    }>(),
    {
      enableLightbox: true,
      group: 'lightbox',
    },
  );

  const html = computed(() => {
    return marked.parse(props.markdown);
  });
</script>

<template>
  <VHtmlContent
    :html="html"
    :group="group"
    :enable-lightbox="enableLightbox"
  />
</template>
