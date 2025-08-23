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
</style>
