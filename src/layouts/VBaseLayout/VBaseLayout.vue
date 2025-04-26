<script lang="ts" setup>
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';

  withDefaults(
    defineProps<{
      isLoading?: boolean;
    }>(),
    {
      isLoading: false,
    },
  );
</script>

<template>
  <main v-if="!isLoading" class="container-fluid pb-128">
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
