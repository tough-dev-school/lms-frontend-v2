<script setup lang="ts">
  import { withDefaults } from 'vue';

  type CardTags = 'div' | 'article' | 'section' | 'details' | 'aside';
  interface Props {
    tag: CardTags;
  }

  withDefaults(defineProps<Props>(), { tag: 'div' });
</script>

<template>
  <component :is="tag" class="w-full rounded bg-white px-32 py-16 shadow">
    <slot />
  </component>
</template>
