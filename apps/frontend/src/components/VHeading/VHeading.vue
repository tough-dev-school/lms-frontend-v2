<script lang="ts" setup>
  export type AllowedTags = 'h1' | 'h2' | 'h3' | 'div';

  export interface Props {
    tag?: AllowedTags;
  }

  withDefaults(defineProps<Props>(), {
    tag: 'h2',
  });
</script>

<template>
  <component
    :is="tag"
    class="font-display"
    :class="{
      'text-h1': tag === 'h1',
      'text-h2': tag === 'h2',
      'text-h3': tag === 'h3',
    }">
    <slot />
  </component>
</template>
