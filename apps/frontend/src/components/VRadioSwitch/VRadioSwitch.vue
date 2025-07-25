<script lang="ts">
  import { nanoid } from 'nanoid';
  import type { TablerIconComponent } from 'vue-tabler-icons';

  export interface RadioOption {
    value: string;
    label: string;
    icon: TablerIconComponent;
  }
</script>

<script lang="ts" setup>
  defineProps<{
    modelValue: string;
    options: RadioOption[];
  }>();
  const emit = defineEmits<{ 'update:modelValue': [value: any] }>();
  const radiogroup = nanoid();
</script>

<template>
  <div class="flex flex-wrap phone:w-auto w-full text-black phone:gap-0 gap-4">
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
      <component :is="option.icon" />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped>
  .RadioSwitch__Button {
    @apply p-8 gap-4 flex border-gray cursor-pointer transition-colors whitespace-nowrap bg-white dark:border-darkmode-border phone:first:rounded-l-4 phone:last:rounded-r-4 phone:first:w-auto first:w-full flex-grow phone:rounded-0 rounded-4;
  }
  .RadioSwitch__Button_Active {
    @apply bg-yellow dark:bg-yellow;
  }
</style>
