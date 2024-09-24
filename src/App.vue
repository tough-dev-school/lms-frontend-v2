<script lang="ts" setup>
  import VDefaultLayout from '@/layouts/VDefaultLayout/VDefaultLayout.vue';
  import { useColorMode } from '@vueuse/core';

  useColorMode();
</script>

<template>
  <VDefaultLayout>
    <RouterView />
  </VDefaultLayout>
</template>
