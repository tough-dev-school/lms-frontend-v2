<script lang="ts" setup>
  import { useColorMode } from '@vueuse/core';
  import { useCrossOriginImages } from './composables/useCrossOriginImages';
  import { useAuth } from './composables/useAuth';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token } = useAuth();

  useColorMode();
  useCrossOriginImages();
</script>

<template>
  <RouterView />
</template>
