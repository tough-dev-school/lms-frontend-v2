<script setup lang="ts">
  defineProps<{
    error: unknown;
  }>();
</script>

<template>
  <pre>{{ JSON.stringify(error, null, 2) }}</pre>
</template>
