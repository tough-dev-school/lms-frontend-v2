<script lang="ts">
  export type Appearance = 'link' | 'primary' | 'secondary';
</script>

<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export interface Props {
    appearance?: Appearance;
    tag?: string;
  }

  withDefaults(defineProps<Props>(), {
    appearance: 'primary',
    tag: 'button',
  });
</script>

<template>
  <component
    :is="tag"
    class="Button"
    :class="{
      Button_Appearance_Link: appearance === 'link',
      Button_Appearance_Primary: appearance === 'primary',
      Button_Appearance_Secondary: appearance === 'secondary',
    }">
    <slot />
  </component>
</template>

<style>
  /* We dont use scoped here because we want to have the button class in the global style */

  .Button {
    @apply leading-[1.5] h-module min-w-[280px] rounded-8 p-module text-center text-black transition-colors border;
    &_Appearance {
      &_Primary {
        @apply bg-yellow border-yellow;
        @apply hover:bg-yellow-hover;
        @apply disabled:opacity-25;
      }
      &_Secondary {
        @apply border-white bg-white text-black;
        @apply hover:border-gray;
        @apply disabled:opacity-25 disabled:border-gray disabled:bg-lightgray;
      }
      &_Link {
        @apply link border-transparent;
        @apply hover:border-transparent;
      }
    }
  }
</style>
