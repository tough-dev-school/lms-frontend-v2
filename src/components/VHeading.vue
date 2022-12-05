<script lang="ts" setup>
  import { defineProps, withDefaults } from 'vue';

  export type AllowedTags = 'h1' | 'h2' | 'h3';

  export interface Props {
    tag: AllowedTags;
  }

  withDefaults(defineProps<Props>(), {
    tag: 'h2',
  });
</script>

<template>
  <component
    :is="tag"
    class="font-display font-bold"
    :class="{
      'text-h1': tag === 'h1',
      'text-h2': tag === 'h2',
      'text-h3': tag === 'h3',
    }">
    <slot />
  </component>
</template>
