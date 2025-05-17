<script lang="ts" setup>
  import { useColorMode } from '@vueuse/core';
  import { useInvalidateOnTokenChange } from './stores/auth';

  useColorMode();
  useInvalidateOnTokenChange();
</script>

<template>
  <RouterView />
</template>
