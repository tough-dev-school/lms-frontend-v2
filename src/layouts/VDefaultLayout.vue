<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu';
  import VPreloader from '@/components/VPreloader';
  import VToastFeed from '@/components/VToastFeed';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import useLoading from '@/stores/loading';

  const route = useRoute();
  const loading = useLoading();

  const hasHeader = computed(() => {
    return !route.meta.isPublic;
  });
</script>

<template>
  <main class="container pb-128" v-if="!loading.isLoading">
    <header class="flex justify-end pt-16 pb-24 tablet:pb-64" v-if="hasHeader">
      <VProfileMenu class="w-full tablet:w-auto" />
    </header>
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
