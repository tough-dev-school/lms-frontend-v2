<script lang="ts" setup>
  import VLoginChange from '@/components/VLoginChange.vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
</script>

<template>
  <VLoginChange
    class="mt-[25vh] pb-32"
    :uid="String(route.params.id)"
    :token="String(route.params.token)"
    @save="router.push({ name: 'login' })" />
</template>
