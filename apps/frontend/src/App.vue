<script lang="ts" setup>
  import { useColorMode } from '@vueuse/core';
  import { useAuth } from './composables/useAuth';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { token } = useAuth();

  useColorMode();
</script>

<template>
  <RouterView />
</template>
