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
    class="flex w-full flex-grow items-center justify-center border-b border-none py-16 text-center font-medium phone:min-h-72 phone:border-r phone:last-of-type:border-r-0"
    :class="{
      'link-bright cursor-pointer hover:bg-lightgray hover:bg-opacity-20': to,
    }"
    :href="to"
  >
    <slot />
  </component>
</template>
