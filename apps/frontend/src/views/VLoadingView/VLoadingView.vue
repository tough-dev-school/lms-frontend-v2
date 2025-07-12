<script lang="ts" setup>
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useAuth } from '@/composables/useAuth';
  import { ref, onMounted, onUnmounted } from 'vue';

  const { token } = useAuth();

  const isTooLong = ref(true);

  let timeout: ReturnType<typeof setTimeout>;

  onMounted(() => {
    timeout = setTimeout(() => {
      isTooLong.value = false;
    }, 300);
  });

  onUnmounted(() => {
    clearTimeout(timeout);
  });
</script>

<template>
  <component :is="token ? VLoggedLayout : VPublicLayout">
    <VPreloader />
  </component>
</template>
