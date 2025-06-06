<script lang="ts" setup>
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
</script>

<template>
  <main class="container-fluid pb-128">
    <slot />
  </main>
  <VToastFeed />
</template>
