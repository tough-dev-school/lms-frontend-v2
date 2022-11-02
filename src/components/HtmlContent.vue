<script lang="ts" setup>
  defineProps({
    content: {
      type: String,
    },
  });
</script>

<template>
  <article v-html="content" class="prose" />
</template>
