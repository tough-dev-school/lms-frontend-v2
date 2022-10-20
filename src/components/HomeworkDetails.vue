<script lang="ts" setup>
  import { defineProps } from 'vue';

  defineProps({ task: { type: String } });
</script>

<template>
  <details>
    <summary>Показать задание</summary>
    <div class="prose mt-8" v-html="task" />
  </details>
</template>
