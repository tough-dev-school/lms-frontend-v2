<script setup lang="ts">
  import { withDefaults } from 'vue';
  import VHeading from '@/components/VHeading/VHeading.vue';

  export interface Props {
    tag?: string;
    title?: string;
  }

  withDefaults(defineProps<Props>(), { tag: 'div', title: undefined });
</script>

<template>
  <section class="flex flex-col gap-24">
    <VHeading v-if="title" tag="h2">{{ title }}</VHeading>
    <component
      :is="tag"
      class="overflow-hidden rounded bg-white p-16 phone:p-24 dark:bg-darkmode-layer2">
      <slot />
      <footer
        class="grow-children mt-32 flex flex-wrap justify-start gap-8 border-t border-gray border-opacity-20 pt-16 empty:hidden phone:gap-16 phone:pt-24 phone:pb-16">
        <slot name="footer" />
      </footer>
    </component>
  </section>
</template>

<style>
  .grow-children > *:not(.flex-grow) {
    flex-grow: 1;
    @apply phone:flex-grow-0;
  }
</style>
