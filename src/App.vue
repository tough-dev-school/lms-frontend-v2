<script lang="ts" setup>
  import ToastFeed from '@/components/ToastFeed.vue';
  import { useTitle } from '@vueuse/core';

  useTitle('Школа Сильных Программистов');
</script>

<template>
  <main class="container mx-auto p-16 pb-128">
    <RouterView />
    <ToastFeed />
  </main>
</template>
