<script lang="ts" setup>
  import { v4 as uuidv4 } from 'uuid';
  import type { VRadioSwitchProps } from '@/types/preferences';

  defineProps<VRadioSwitchProps>();
  const emit = defineEmits<{ 'update:modelValue': [value: any] }>();
  const radiogroup = uuidv4();
</script>

<template>
  <div class="flex text-black">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="RadioSwitch__Button"
      :class="{ RadioSwitch__Button_Active: option.value === modelValue }">
      <input
        type="radio"
        :name="radiogroup"
        class="visually-hidden"
        :value="option.value"
        @click="emit('update:modelValue', option.value)" />
      <component :is="option.icon" class="phone:w-24 w-16" />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped>
  .RadioSwitch__Button {
    @apply border-y px-8 py-8 gap-4 flex border-gray bg-offwhite  cursor-pointer transition-colors whitespace-nowrap;
    @apply dark:bg-darkmode-white dark:border-darkmode-border;
    @apply first:rounded-l-4 first:border-l last:rounded-r-4 last:border-r;
  }
  .RadioSwitch__Button_Active {
    @apply bg-yellow dark:bg-yellow;
  }
</style>
