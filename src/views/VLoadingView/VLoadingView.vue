<script lang="ts" setup>
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import useAuth from '@/stores/auth';

  const { token } = useAuth();
</script>

<template>
  <component :is="token ? VLoggedLayout : VPublicLayout">
    <VPreloader />
  </component>
</template>
