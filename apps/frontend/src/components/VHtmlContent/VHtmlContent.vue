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

<style></style>
