<script lang="ts" setup>
  import VLogo from '@/components/VLogo/VLogo.vue';
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const hasProfile = computed(() => {
    return !route.meta.unauthorizedOnly;
  });
</script>

<template>
  <header
    class="flex flex-wrap justify-between items-center pt-16 pb-24 tablet:pb-32 gap-8">
    <RouterLink to="/" data-testid="logo" class="se:block hidden">
      <VLogo />
    </RouterLink>
    <VProfileMenu v-if="hasProfile" data-testid="profile" />
  </header>
</template>
