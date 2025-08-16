<script setup lang="ts">
  import { onBeforeMount } from 'vue';
  import VLoadingView from '../VLoadingView/VLoadingView.vue';
  import { useAuth } from '@/composables/useAuth';
  import { useRouter } from 'vue-router';

  /**
   * Logout is done via component because we need to make sure that there are no useQuery used,
   * otherwise they will send some guarantied 401 requests to server
   * */

  const { token } = useAuth();
  const router = useRouter();

  onBeforeMount(() => {
    token.value = undefined;
    router.push({ name: 'login' });
  });
</script>

<template>
  <VLoadingView />
</template>
