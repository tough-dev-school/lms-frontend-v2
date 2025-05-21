<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import type { Module } from '@/api/generated-api';

  const props = defineProps<{
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
  <RouterLink :to="{ name: 'lessons', params: { moduleId: module.id } }">
    <div
      :class="[
        cardClass(index),
        'VModuleCard text-black min-h-120 rounded-16 p-16 tablet:p-24',
      ]">
      <VHeading tag="h3">{{ module.name }}</VHeading>
      <p v-if="module.text">
        {{ module.text }}
      </p>
      <VHtmlContent v-if="module.description" :content="module.description" />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .VModuleCard {
    @apply transition-transform hover:scale-[1.02];
  }
</style>
