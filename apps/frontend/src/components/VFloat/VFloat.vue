<script lang="ts" setup>
  import { IconDotsVertical } from '@tabler/icons-vue';
</script>

<template>
  <VDropdown placement="bottom-end">
    <button class="text-gray transition-colors hover:text-black">
      <IconDotsVertical />
    </button>
    <template #popper>
      <slot />
    </template>
  </VDropdown>
</template>

<style>
  .v-popper--theme-dropdown .v-popper__inner.v-popper__inner {
    @apply border-none overflow-hidden rounded-8 bg-white dark:bg-darkmode-layer2 dark:text-white shadow;
  }

  .v-popper__arrow-container {
    @apply hidden;
  }
</style>
