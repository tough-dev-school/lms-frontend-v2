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
    class="overflow-hidden rounded bg-white px-16 py-16 shadow phone:px-32">
    <slot />
    <footer
      class="mt-32 flex flex-wrap justify-end gap-16 border-t border-gray border-opacity-20 pt-24 pb-16 empty:hidden">
      <slot name="footer" />
    </footer>
  </component>
</template>
