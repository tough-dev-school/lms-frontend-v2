<script lang="ts" setup>
  import VLoginLink from '@/components/VLoginLink/VLoginLink.vue';
  import VLoginPassword from '@/components/VLoginPassword/VLoginPassword.vue';
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import { ref } from 'vue';

  export type Mode = 'link' | 'password';

  defineProps<{
    next?: string;
  }>();

  const mode = ref<Mode>('link');
</script>

<template>
  <VPublicLayout>
    <VLoginLink
      v-if="mode === 'link'"
      data-testid="login-link"
      @change="mode = 'password'" />
    <VLoginPassword
      v-else-if="mode === 'password'"
      :next="next"
      data-testid="login-password"
      @change="mode = 'link'" />
  </VPublicLayout>
</template>
