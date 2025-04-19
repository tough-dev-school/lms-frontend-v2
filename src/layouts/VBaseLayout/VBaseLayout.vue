<script lang="ts" setup>
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
  import useLoading from '@/stores/loading';

  const loading = useLoading();
</script>

<template>
  <main v-if="!loading.isLoading" class="container-fluid pb-128">
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
