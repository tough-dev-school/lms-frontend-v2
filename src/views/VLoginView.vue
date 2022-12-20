<script lang="ts" setup>
  import VLoginLink from '@/components/VLoginLink.vue';
  import VLoginPassword from '@/components/VLoginPassword.vue';
  import { ref } from 'vue';

  export type Mode = 'link' | 'password';

  const mode = ref<Mode>('link');

  const handleModeChange = (newMode: Mode) => {
    mode.value = newMode;
  };
</script>

<template>
  <VLoginLink
    class="mt-[25vh]"
    v-if="mode === 'link'"
    @change="handleModeChange" />
  <VLoginPassword
    class="mt-[25vh]"
    v-else-if="mode === 'password'"
    @change="handleModeChange" />
</template>
