<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VToastFeed from '@/components/VToastFeed/VToastFeed.vue';
  import VLogo from '@/components/VLogo/VLogo.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import useLoading from '@/stores/loading';

  const route = useRoute();
  const loading = useLoading();

  const hasProfile = computed(() => {
    return !route.meta.isPublic;
  });
</script>

<template>
  <main v-if="!loading.isLoading" class="container-fluid pb-128">
    <header
      class="flex flex-wrap justify-between items-center pt-16 pb-24 tablet:pb-64 gap-8">
      <VLogo />
      <VProfileMenu v-if="hasProfile" class="tablet:w-auto w-full" />
    </header>
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
