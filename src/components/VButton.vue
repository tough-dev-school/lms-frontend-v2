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
    class="h-module w-full min-w-[240px]"
    :class="{
      'rounded-row bg-yellow p-module text-center leading-1.5 text-black transition-opacity transition-colors hover:bg-yellow-hover disabled:opacity-25':
        tag === 'button',
      link: tag === 'link',
    }">
    <slot />
  </button>
</template>
