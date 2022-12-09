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
    class="overflow-hidden rounded bg-white px-16 py-16 shadow dark:bg-dark-gray tablet:px-32">
    <slot />
  </component>
</template>
