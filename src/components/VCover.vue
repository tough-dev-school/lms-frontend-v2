<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import { computed } from 'vue';

  interface Props {
    name: string;
    image?: string;
  }

  const props = defineProps<Props>();

  const clearName = computed(() => {
    const additionalInfoStart = props.name
      .split('')
      .findIndex((item) => item === '(');

    if (additionalInfoStart > 0) {
      return props.name.slice(0, additionalInfoStart).trim();
    }

    return props.name;
  });
</script>

<template>
  <div class="relative">
    <div class="flex w-full items-center justify-center bg-black">
      <div class="pb-[40%]"></div>
      <VHeading tag="div" class="text-h1 text-white" data-testid="auto-cover">{{
        clearName
      }}</VHeading>
    </div>
    <img
      :src="image"
      v-if="image"
      class="absolute top-0 left-0 right-0"
      data-testid="image-cover" />
  </div>
</template>
