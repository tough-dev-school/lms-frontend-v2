<script lang="ts">
  export type Appearance = 'link' | 'primary' | 'secondary';
  export type Type = 'big' | 'inline';
</script>

<script lang="ts" setup>
  export interface Props {
    appearance?: Appearance;
    size?: Type;
    tag?: string;
    // loading and disabled are doing same thing but with different visuals
    loading?: boolean;
    disabled?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    appearance: 'primary',
    size: 'big',
    tag: 'button',
    loading: false,
    disabled: false,
  });
</script>

<template>
  <component
    :is="tag"
    class="Button"
    :class="{
      'link border-transparent hover:border-transparent': appearance === 'link',
      Button_Appearance_Primary: appearance === 'primary',
      Button_Appearance_Secondary: appearance === 'secondary',
      Button_Size_Big: size === 'big',
      Button_Size_Inline: size === 'inline',
      Button_Loading: loading,
    }"
    :disabled="loading || disabled">
    <slot />
  </component>
</template>

<style>
  /* We dont use scoped here because we want to have the button class in the global style */

  .Button {
    @apply leading-[1.5] font-medium rounded-8 text-center transition-colors;
    &_Size {
      &_Big {
        @apply min-w-[280px] h-module p-module;
      }
      &_Inline {
        @apply min-w-0;
      }
    }
    &_Appearance {
      &_Primary {
        @apply bg-yellow text-black border-yellow border;
        @apply hover:bg-yellow-hover;
      }
      &_Primary:not(.Button_Loading) {
        @apply disabled:opacity-25;
      }
      &_Secondary {
        @apply border-white bg-white text-black border;
        @apply hover:border-gray;
      }
      &_Secondary:not(.Button_Loading) {
        @apply disabled:opacity-25 disabled:border-gray disabled:bg-lightgray;
      }
    }
    &_Loading {
      @apply animate-pulse cursor-wait;
    }
  }
</style>
