<script lang="ts" setup>
  import VLoginLink from '@/components/VLoginLink';
  import VLoginPassword from '@/components/VLoginPassword';
  import { ref } from 'vue';

  export type Mode = 'link' | 'password';

  const mode = ref<Mode>('link');
</script>

<template>
  <VLoginLink
    class="mt-[25vh]"
    v-if="mode === 'link'"
    data-testid="login-link"
    @change="mode = 'password'" />
  <VLoginPassword
    class="mt-[25vh]"
    data-testid="login-password"
    v-else-if="mode === 'password'"
    @change="mode = 'link'" />
</template>
