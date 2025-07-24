<script lang="ts" setup>
  import { useColorMode } from '@vueuse/core';
  import { useCrossOriginImages } from './composables/useCrossOriginImages';

  useColorMode();
  useCrossOriginImages();
</script>

<template>
  <RouterView />
</template>
