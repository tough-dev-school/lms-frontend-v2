<script lang="ts" setup>
  defineProps<{
    html: string;
  }>();
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

  /* Table styles to match VTextEditor */
  .prose table {
    @apply border border-lightgray dark:border-darkmode-border border-collapse table-auto w-full bg-white;
  }

  .prose th {
    @apply bg-lightgray dark:bg-darkmode-layer3 font-bold p-8;
  }

  .prose td {
    @apply border border-lightgray dark:border-darkmode-border p-8;
  }

  .prose .tableWrapper {
    @apply overflow-x-auto;
  }
</style>
