<script lang="ts" setup>
  import { VPreloader } from '@/components/VPreloader';
  import { VProfileMenu } from '@/components/VProfileMenu';
  import { VToastFeed } from '@/components/VToastFeed';
  import useLoading from '@/stores/loading';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const loading = useLoading();

  const hasProfile = computed(() => {
    return !route.meta.isPublic;
  });
</script>

<template>
  <main class="container pb-128" v-if="!loading.isLoading">
    <header
      class="flex flex-wrap justify-between items-center pt-16 pb-24 tablet:pb-64 gap-8">
      <RouterLink to="/">
        <div class="flex gap-8 p-8 items-end">
          <img src="/logo.svg" class="h-32" />
          <img src="/logo-text.svg" class="h-[28px]" />
        </div>
      </RouterLink>
      <VProfileMenu v-if="hasProfile" class="tablet:w-auto w-full" />
    </header>
    <slot />
  </main>
  <VPreloader v-else />
  <VToastFeed />
</template>
