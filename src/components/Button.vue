<script lang="ts" setup>
  defineProps({
    type: {
      type: String,
      default: 'button',
      validator(value: string) {
        return ['button', 'link'].includes(value);
      },
    },
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
