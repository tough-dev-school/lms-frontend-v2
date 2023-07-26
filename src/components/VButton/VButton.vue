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
    type="button"
    :class="{
      button: appearance === 'button',
      link: appearance === 'link',
    }">
    <slot />
  </button>
</template>
