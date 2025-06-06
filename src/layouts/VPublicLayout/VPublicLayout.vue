<script lang="ts" setup>
  import VHeader from '@/components/VHeader/VHeader.vue';
  import VBaseLayout from '@/layouts/VBaseLayout/VBaseLayout.vue';

  defineProps<{ isLoading?: boolean }>();
</script>

<template>
  <VBaseLayout>
    <VHeader>
      <slot name="header" />
    </VHeader>
    <div class="flex flex-col gap-48">
      <slot />
    </div>
  </VBaseLayout>
</template>
