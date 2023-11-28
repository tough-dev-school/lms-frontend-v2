<script setup lang="ts">
  import { withDefaults } from 'vue';

  export interface Props {
    tag?: string;
  }

  withDefaults(defineProps<Props>(), { tag: 'div' });
</script>

<template>
  <component
    :is="tag"
    :class="{
      'overflow-hidden rounded bg-white  p-24 pt-16 border border-gray ': true,
      'dark:border-darkmode-border dark:bg-darkmode-layer2': true,
    }">
    <slot />
    <footer
      :class="{
        'grow-children mt-32 flex flex-wrap justify-end gap-8 empty:hidden phone:gap-16 ': true,
        'dark:border-darkmode-white dark:border-opacity-100': true,
      }">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style>
  .grow-children > *:not(.flex-grow) {
    flex-grow: 1;
    @apply phone:flex-grow-0;
  }
</style>
