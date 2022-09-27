<script lang="ts" setup>
  import ToastFeed from '@/components/ToastFeed.vue';
</script>

<template>
  <main class="container mx-auto p-16 pb-128">
    <RouterView />
    <ToastFeed />
  </main>
</template>
