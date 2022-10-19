<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps({ task: { type: String } });
</script>

<template>
  <details>
    <summary>Показать задание</summary>
    <div v-text="task" />
  </details>
</template>
