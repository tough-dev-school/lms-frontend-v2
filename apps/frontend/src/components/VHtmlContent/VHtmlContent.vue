<script lang="ts" setup>
  export interface Props {
    content: string;
  }

  defineProps<Props>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article
    class="prose prose-pre:bg-transparent prose-a:break-words prose-custom"
    v-html="content" />
</template>

<style>
  .prose > *:first-child {
    margin-top: 0;
  }
  .prose > *:last-child {
    margin-bottom: 0;
  }
</style>
