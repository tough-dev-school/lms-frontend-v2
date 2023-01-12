<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export type Appearance = 'button' | 'link';

  export interface Props {
    appearance?: Appearance;
  }

  withDefaults(defineProps<Props>(), {
    appearance: 'button',
  });
</script>

<template>
  <button
    class="h-module min-w-[240px]"
    :class="{
      'leading-1.5 rounded bg-yellow p-module text-center text-black transition-opacity transition-colors hover:bg-yellow-hover disabled:opacity-25':
        appearance === 'button',
      link: appearance === 'link',
    }">
    <slot />
  </button>
</template>
