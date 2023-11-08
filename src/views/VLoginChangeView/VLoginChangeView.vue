<script lang="ts" setup>
  import VPasswordSettings from '@/components/VPasswordSettings/VPasswordSettings.vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
</script>

<template>
  <VPasswordSettings
    :uid="String(route.params.uid)"
    :token="String(route.params.token)"
    @save="router.push({ name: 'login' })" />
</template>
