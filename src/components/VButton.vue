<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export type AllowedTags = 'button' | 'link';

  export interface Props {
    type: AllowedTags;
  }

  withDefaults(defineProps<Props>(), {
    type: 'button',
  });
</script>

<template>
  <button
    class="h-56 min-w-[240px]"
    :class="{
      'rounded-row bg-yellow text-center text-black transition-opacity transition-colors hover:bg-yellow-hover disabled:opacity-25':
        type === 'button',
      Link: type === 'link',
    }">
    <slot />
  </button>
</template>
