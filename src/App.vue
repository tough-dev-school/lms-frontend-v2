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
    <header class="flex justify-end pt-16 pb-24 tablet:pb-64" v-if="hasHeader">
      <ProfileMenu class="w-full tablet:w-auto tablet:min-w-[192px]" />
    </header>
    <RouterView />
    <ToastFeed />
  </main>
</template>
