<script lang="ts" setup>
  import VLoginLink from '@/components/VLoginLink.vue';
  import VLoginPassword from '@/components/VLoginPassword.vue';
  import VLoginReset from '@/components/VLoginReset.vue';
  // import VLoginChange from '@/components/VLoginChange.vue';
  import { ref } from 'vue';

  export type Mode = 'link' | 'password' | 'reset' | 'change';

  const mode = ref<Mode>('link');

  const handleModeChange = (newMode: Mode) => {
    mode.value = newMode;
  };
</script>

<template>
  <VLoginLink
    class="mt-[25vh] pb-32"
    v-if="mode === 'link'"
    @change="handleModeChange" />
  <VLoginPassword
    class="mt-[25vh] pb-32"
    v-else-if="mode === 'password'"
    @change="handleModeChange" />
  <VLoginReset
    v-else-if="mode === 'reset'"
    class="mt-[25vh] pb-32"
    @change="handleModeChange" />
  <!-- <VLoginChange class="mt-[25vh] pb-32" v-if="mode === 'link"/> -->
</template>
