<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import type { Module } from '@/api/generated-api';
  import VTag from '../VTag/VTag.vue';
  import { formatDate } from '@/utils/date';

  defineProps<{
    module: Module;
    index: number;
  }>();

  const cardClass = (number: number) => {
    const colors = [
      '!bg-accent-yellow dark:!bg-accent-yellow',
      '!bg-accent-orange dark:!bg-accent-orange',
      '!bg-accent-green dark:!bg-accent-green',
      '!bg-accent-blue dark:!bg-accent-blue',
    ];

    return colors[number % colors.length];
  };
</script>

<template>
  <div
    :class="[
      cardClass(index),
      'VModuleCard text-black min-h-120 rounded-16 p-16 tablet:p-24 flex flex-col gap-8',
    ]"
  >
    <div v-if="module.start_date" class="flex justify-start">
      <VTag>{{ formatDate(module.start_date, 'DD.MM') }}</VTag>
    </div>
    <VHeading tag="h3">{{ module.name }}</VHeading>
    <p v-if="module.description">
      {{ module.description }}
    </p>
  </div>
</template>

<style scoped>
  .VModuleCard {
    @apply transition-transform hover:scale-[1.01] origin-center;
  }
</style>
