<script lang="ts" setup>
  export interface Props {
    content: string;
  }

  defineProps<Props>();
</script>

<template>
  <article v-html="content" class="prose" />
</template>
