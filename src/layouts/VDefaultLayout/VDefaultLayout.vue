<script lang="ts" setup>
  import VHeader from '@/components/VHeader/VHeader.vue';
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
  import useLoading from '@/stores/loading';

  const loading = useLoading();
</script>

<template>
  <main v-if="!loading.isLoading" class="container-fluid pb-128">
    <VHeader />
    <div class="grid gap-48">
      <slot />
    </div>
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
