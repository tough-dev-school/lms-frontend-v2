<script lang="ts" setup>
  defineProps<{
    html: string;
  }>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article
    class="prose-custom prose prose-a:break-words prose-pre:bg-transparent"
    v-html="html"
  />
</template>

<style>
  .prose {
    @apply flex flex-col;
  }

  .prose > *:first-child {
    margin-top: 0;
  }
  .prose > *:last-child {
    margin-bottom: 0;
  }

  /* Table styles to match VTextEditor */
  .prose table {
    @apply w-full table-auto border-collapse border border-gray bg-transparent dark:border-darkmode-border;
  }

  .prose th {
    @apply bg-transparent p-8 font-bold;
  }

  .prose td {
    @apply border border-gray p-8 dark:border-darkmode-border;
  }

  .prose .tableWrapper {
    @apply overflow-x-auto;
  }
</style>
