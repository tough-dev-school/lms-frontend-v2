<script setup lang="ts">
  import { withDefaults } from 'vue';

  type CardTags = 'div' | 'article' | 'section' | 'details' | 'aside';
  interface Props {
    tag: CardTags;
  }

  withDefaults(defineProps<Props>(), { tag: 'div' });
</script>

<template>
  <component
    :is="tag"
    class="w-full overflow-hidden bg-white px-16 py-16 shadow tablet:rounded tablet:px-32">
    <slot />
  </component>
</template>
