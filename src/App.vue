<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed.vue';
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
    <RouterView />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
