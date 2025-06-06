<script lang="ts" setup>
  defineProps<{
    to?: string;
  }>();
</script>

<template>
  <component
    :is="to ? 'a' : 'div'"
    data-testid="pill-item"
    :style="{ flexBasis: 'calc(100% / 3)' }"
    class="py-16 phone:min-h-72 w-full flex-grow flex justify-center items-center text-center font-medium border-b phone:border-r border-none phone:last-of-type:border-r-0"
    :class="{
      'hover:bg-lightgray hover:bg-opacity-20 cursor-pointer link-bright': to,
    }"
    :href="to">
    <slot />
  </component>
</template>
