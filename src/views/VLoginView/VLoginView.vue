<script lang="ts" setup>
  import VLoginLink from '@/components/VLoginLink/VLoginLink.vue';
  import VLoginPassword from '@/components/VLoginPassword/VLoginPassword.vue';
  import { ref } from 'vue';

  export type Mode = 'link' | 'password';

  const mode = ref<Mode>('link');
</script>

<template>
  <VLoginLink
    v-if="mode === 'link'"
    data-testid="login-link"
    @change="mode = 'password'" />
  <VLoginPassword
    v-else-if="mode === 'password'"
    data-testid="login-password"
    @change="mode = 'link'" />
</template>
