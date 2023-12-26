<script lang="ts" setup>
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const hasProfile = computed(() => {
    return !route.meta.isPublic;
  });
</script>

<template>
  <header
    class="flex flex-wrap justify-between items-center pt-16 pb-24 tablet:pb-64 gap-8">
    <RouterLink to="/" data-testid="logo" class="se:block hidden">
      <div class="flex gap-8 p-8 items-end">
        <img src="/logo.svg" class="h-32" />
        <img src="/logo-text.svg" class="h-[28px] phone:block hidden" />
      </div>
    </RouterLink>
    <VProfileMenu v-if="hasProfile" data-testid="profile" />
  </header>
</template>
