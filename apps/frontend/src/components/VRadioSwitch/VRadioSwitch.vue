<script lang="ts">
  import type { Icon } from '@tabler/icons-vue';

  export interface RadioOption {
    value: string;
    label: string;
    icon: Icon;
  }
</script>

<script lang="ts" setup>
  /* eslint-disable import-x/first */
  import { useId } from 'vue';

  defineProps<{
    modelValue: string;
    options: RadioOption[];
  }>();
  const emit = defineEmits<{ 'update:modelValue': [string] }>();
  // Same id on the server and in the browser, a random one would break hydration
  const radiogroup = useId();
</script>

<template>
  <div class="flex w-full flex-wrap gap-4 text-black phone:w-auto phone:gap-0">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="RadioSwitch__Button"
      :class="{ RadioSwitch__Button_Active: option.value === modelValue }"
    >
      <input
        type="radio"
        :name="radiogroup"
        class="visually-hidden"
        :value="option.value"
        @click="emit('update:modelValue', option.value)"
      />
      <component :is="option.icon" />
      {{ option.label }}
    </label>
  </div>
</template>

<style scoped>
  .RadioSwitch__Button {
    @apply flex flex-grow cursor-pointer gap-4 whitespace-nowrap rounded-4 border-gray bg-white p-8 transition-colors first:w-full dark:border-darkmode-border phone:rounded-0 phone:first:w-auto phone:first:rounded-l-4 phone:last:rounded-r-4;
  }
  .RadioSwitch__Button_Active {
    @apply bg-yellow dark:bg-yellow;
  }
</style>
