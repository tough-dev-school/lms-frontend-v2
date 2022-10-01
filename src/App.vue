<script lang="ts" setup>
  import ProfileMenu from '@/components/ProfileMenu.vue';
  import ToastFeed from '@/components/ToastFeed.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const hasHeader = computed(() => {
    return route.name !== 'login';
  });
</script>

<template>
  <main class="container mx-auto p-16 pb-128">
    <header class="flex justify-end p-8" v-if="hasHeader">
      <ProfileMenu />
    </header>
    <RouterView />
    <ToastFeed />
  </main>
</template>
