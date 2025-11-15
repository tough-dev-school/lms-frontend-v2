<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import type { Module } from '@/api/generated/generated-api';
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
      'VModuleCard flex min-h-120 flex-col gap-8 rounded-16 p-16 text-black tablet:p-24',
      module.has_started
        ? 'origin-center transition-all duration-100 ease-out hover:scale-[1.02] hover:shadow'
        : 'pointer-events-none cursor-not-allowed grayscale',
    ]"
  >
    <div
      v-if="module.start_date"
      class="flex justify-start"
    >
      <VTag>{{ formatDate(module.start_date, 'DD.MM') }}</VTag>
    </div>
    <VHeading tag="h3">{{ module.name }}</VHeading>
    <p v-if="module.description">
      {{ module.description }}
    </p>
  </div>
</template>
