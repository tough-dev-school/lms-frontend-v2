<script lang="ts" setup>
  import { onMounted, ref } from 'vue';

  // Some widgets only work with a real DOM. The server and the first client render show the
  // fallback, so hydration matches, and the widget appears once the page is mounted.
  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  });
</script>

<template>
  <slot v-if="isMounted" />
  <slot
    v-else
    name="fallback"
  />
</template>
