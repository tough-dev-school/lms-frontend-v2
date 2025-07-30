<script setup lang="ts">
  import VDetails from '@/components/VDetails/VDetails.vue';

  const props = defineProps<{
    guide: string;
  }>();
</script>

<template>
  <VDetails tag="details">
    <template #title> Как давать обратную связь? </template>
    <div
      class="prose mt-8 prose-h3:mt-16 prose-h3:text-base"
      v-html="props.guide" />
  </VDetails>
</template>
