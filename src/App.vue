<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu.vue';
  import VToastFeed from '@/components/VToastFeed.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const hasHeader = computed(() => {
    return route.name !== 'login';
  });
</script>

<template>
  <main class="container pb-128">
    <header
      class="flex justify-end px-16 pt-16 pb-24 tablet:px-32 tablet:pb-64"
      v-if="hasHeader">
      <VProfileMenu class="w-full tablet:w-auto" />
    </header>
    <RouterView />
    <VToastFeed />
  </main>
</template>
