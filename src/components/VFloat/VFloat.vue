<script lang="ts" setup>
  import { DotsVerticalIcon } from 'vue-tabler-icons';
</script>

<template>
  <VDropdown placement="bottom-end">
    <button class="text-gray transition-colors hover:text-black">
      <DotsVerticalIcon />
    </button>
    <template #popper>
      <slot />
    </template>
  </VDropdown>
</template>

<style>
  .v-popper--theme-dropdown .v-popper__inner.v-popper__inner {
    @apply float-card border-none shadow overflow-hidden rounded-8 bg-white dark:bg-darkmode-layer2 dark:text-darkmode-white shadow;
  }

  .v-popper__arrow-container {
    @apply hidden;
  }
</style>
