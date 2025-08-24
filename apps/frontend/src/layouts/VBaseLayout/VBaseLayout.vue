<script lang="ts" setup>
  import VSupportChat from '@/components/VSupportChat/VSupportChat.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
</script>

<template>
  <main class="container-fluid pb-128">
    <slot />
  </main>
  <VSupportChat />
  <VToastFeed />
</template>
