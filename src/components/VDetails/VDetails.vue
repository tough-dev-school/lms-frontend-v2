<script lang="ts" setup>
  import { ref } from 'vue';
  import VHeading from '../VHeading/VHeading.vue';

  const isOpen = ref(false);
</script>

<template>
  <div class="bg-yellow rounded-16">
    <button
      class="pl-64 py-16 block w-full text-left relative min-h-56"
      type="button"
      @click="isOpen = !isOpen">
      <svg
        :class="{ 'rotate-90': isOpen }"
        class="absolute top-16 left-24 transition-transform duration-300"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.29298 18.2929C7.90248 18.6834 7.90248 19.3166 8.29298 19.7071C8.68348 20.0976 9.31668 20.0976 9.70718 19.7071L16.3536 13.0607C16.9394 12.4749 16.9394 11.5251 16.3536 10.9393L9.70718 4.29289C9.31668 3.90237 8.68348 3.90237 8.29298 4.29289C7.90248 4.68342 7.90248 5.31658 8.29298 5.70711L14.5859 12L8.29298 18.2929Z"
          fill="black" />
      </svg>
      <div>
        <VHeading v-if="$slots.title" tag="h3"><slot name="title" /></VHeading>
        <slot name="summary" />
      </div>
    </button>
    <div v-if="isOpen" class="pl-64 pr-16 py-16">
      <slot />
      <slot name="details" />
    </div>
  </div>
</template>
