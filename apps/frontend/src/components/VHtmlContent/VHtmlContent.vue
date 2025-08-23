<script lang="ts" setup>
  import { computed } from 'vue';
  import { generateHTML } from '@tiptap/vue-3';
  import { getExtensions } from '@/utils/tiptapExtensions';

  const props = defineProps<{
    content: string | object;
  }>();

  const html = computed(() => {
    if (typeof props.content === 'string') return props.content;

    return generateHTML(props.content, getExtensions({ placeholder: '' }));
  });
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article
    class="prose prose-pre:bg-transparent prose-a:break-words prose-custom"
    v-html="html" />
</template>

<style>
  .prose > *:first-child {
    margin-top: 0;
  }
  .prose > *:last-child {
    margin-bottom: 0;
  }
</style>
