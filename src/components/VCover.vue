<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import { computed } from 'vue';

  export interface Props {
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
      <svg
        class="absolute top-0 left-0 right-0 h-full w-full"
        viewBox="0 0 750 300">
        <foreignObject width="750" height="300">
          <div
            class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <VHeading
              tag="div"
              class="text-center text-h1 text-white"
              data-testid="auto-cover"
              >{{ clearName }}</VHeading
            >
          </div>
        </foreignObject>
      </svg>
    </div>
    <img
      :src="image"
      v-if="image"
      class="absolute top-0 left-0 right-0"
      data-testid="image-cover" />
  </div>
</template>
