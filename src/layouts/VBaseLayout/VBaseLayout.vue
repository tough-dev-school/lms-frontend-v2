<script lang="ts" setup>
  import VPreloader from '@/components/VPreloader/VPreloader.vue';

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
</template>
