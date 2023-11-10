<script lang="ts">
  interface RadioOption {
    value: any;
    label: string;
    icon: any;
  }

  interface VRadioSwitchProps {
    modelValue: any;
    options: RadioOption;
  }
</script>

<script lang="ts" setup>
  import { nanoid } from 'nanoid';

  defineProps<VRadioSwitchProps>();
  const emit = defineEmits<{ 'update:modelValue': [value: any] }>();

  const radiogroup = nanoid();
</script>

<template>
  <div class="flex">
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
    @apply border-y px-8 py-8 gap-4 flex border-gray bg-offwhite cursor-pointer transition-colors;
    @apply first:rounded-l-4 first:border-l last:rounded-r-4 last:border-r;
  }

  .RadioSwitch__Button_Active {
    @apply bg-yellow;
  }
</style>
