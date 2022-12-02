<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu.vue';
  import VToastFeed from '@/components/VToastFeed.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { PUBLIC_ROUTES } from './router';

  const route = useRoute();

  const hasHeader = computed(() => {
    return !PUBLIC_ROUTES.includes(String(route.name));
  });
</script>

<template>
  <main class="container pb-128">
    <header class="flex justify-end pt-16 pb-24 tablet:pb-64" v-if="hasHeader">
      <VProfileMenu class="w-full tablet:w-auto" />
    </header>
    <RouterView />
    <VToastFeed />
  </main>
</template>
