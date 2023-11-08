<script lang="ts" setup>
  export interface Props {
    content: string;
  }

  defineProps<Props>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article class="prose dark:prose-invert" v-html="content" />
</template>
