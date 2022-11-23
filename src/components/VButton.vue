<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export type AllowedTags = 'button' | 'link';

  export interface Props {
    tag?: AllowedTags;
  }

  withDefaults(defineProps<Props>(), {
    tag: 'button',
  });
</script>

<template>
  <button
    class="h-56 min-w-[240px]"
    :class="{
      'rounded-row bg-yellow text-center text-black transition-opacity transition-colors hover:bg-yellow-hover disabled:opacity-25':
        tag === 'button',
      Link: tag === 'link',
    }">
    <slot />
  </button>
</template>
