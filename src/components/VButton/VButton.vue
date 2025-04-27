<script lang="ts">
  export type Appearance = 'link' | 'primary' | 'secondary';
  export type Type = 'big' | 'inline';
</script>

<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export interface Props {
    appearance?: Appearance;
    type?: Type;
    tag?: string;
  }

  withDefaults(defineProps<Props>(), {
    appearance: 'primary',
    type: 'big',
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
      Button_Type_Big: type === 'big',
      Button_Type_Inline: type === 'inline',
    }">
    <slot />
  </component>
</template>

<style>
  /* We dont use scoped here because we want to have the button class in the global style */

  .Button {
    @apply leading-[1.5] font-medium rounded-8 text-center text-black transition-colors border;
    &_Type {
      &_Big {
        @apply min-w-[280px] h-module p-module;
      }
      &_Inline {
        @apply min-w-0;
      }
    }
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
