<script lang="ts" setup>
  import { computed, defineProps, ref, withDefaults } from 'vue';

  export interface Props {
    level: number | string;
  }

  const props = withDefaults(defineProps<Props>(), {
    level: 2,
  });

  const level = ref(String(props.level));

  const tag = computed(() => {
    if (level.value === '1') return 'h1';
    if (level.value === '2') return 'h2';
    if (level.value === '3') return 'h3';
    return 'h2';
  });
</script>

<template>
  <component
    :is="tag"
    class="font-display font-bold"
    :class="{
      'text-h1': level === '1',
      'text-h2': level === '2',
      'text-h3': level === '3',
    }">
    <slot />
  </component>
</template>
