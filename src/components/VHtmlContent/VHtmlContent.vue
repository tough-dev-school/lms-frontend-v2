<script lang="ts" setup>
  export interface Props {
    content: string;
  }

  defineProps<Props>();
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <!-- #TODO Check for XSS-->
  <article class="prose prose-custom" v-html="content" />
</template>
