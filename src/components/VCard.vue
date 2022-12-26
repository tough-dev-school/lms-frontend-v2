<script setup lang="ts">
  import { withDefaults } from 'vue';

  export type CardTags = 'div' | 'article' | 'section' | 'details' | 'aside';
  export interface Props {
    tag?: CardTags;
  }

  withDefaults(defineProps<Props>(), { tag: 'div' });
</script>

<template>
  <component
    :is="tag"
    class="overflow-hidden rounded bg-white p-16 shadow phone:px-24 tablet:px-32 dark:bg-dark-gray">
    <slot />
    <footer
      class="grow-children mt-32 flex flex-wrap justify-end gap-8 border-t border-gray border-opacity-20 pt-16 empty:hidden phone:gap-16 phone:pt-24 phone:pb-16">
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
