<script setup lang="ts">
  import { withDefaults } from 'vue';
  import VHeading from '@/components/VHeading/VHeading.vue';

  export interface Props {
    tag?: string;
    title?: string;
  }

  defineOptions({
    inheritAttrs: false,
  });

  withDefaults(defineProps<Props>(), { tag: 'div', title: undefined });
</script>

<template>
  <section class="flex flex-col gap-24">
    <VHeading v-if="title" tag="h2">{{ title }}</VHeading>
    <component :is="tag" v-bind="$attrs">
      <slot />
      <footer
        v-if="$slots.footer"
        class="grow-children mt-32 flex flex-wrap justify-start gap-8 phone:gap-16">
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
