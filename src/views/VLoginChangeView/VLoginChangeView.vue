<script lang="ts" setup>
  import VPasswordSettings from '@/components/VPasswordSettings/VPasswordSettings.vue';
  import { useRouter } from 'vue-router';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';

  const props = defineProps<{
    uid: string;
    token: string;
  }>();

  const router = useRouter();
</script>

<template>
  <VPublicLayout>
    <VPasswordSettings
      :uid="props.uid"
      :token="props.token"
      @save="router.push({ name: 'login' })" />
  </VPublicLayout>
</template>
