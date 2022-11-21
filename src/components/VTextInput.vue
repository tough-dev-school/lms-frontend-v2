<script lang="ts" setup>
  import { withDefaults } from 'vue';

  export interface Props {
    label?: string;
    tip?: string;
    error?: boolean | string;
    modelValue: string;
  }

  withDefaults(defineProps<Props>(), {
    modelValue: '',
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  };
</script>

<template>
  <label class="w-full">
    <div v-if="label" class="mb-8 text-gray" data-testid="label">
      {{ label }}
    </div>
    <input
      v-bind="$attrs"
      :class="{
        'block h-56 w-full rounded border border-gray bg-offwhite p-16 text-black placeholder:text-gray focus:border-blue focus:outline-none': true,
        'border-red': error,
      }"
      data-testid="input"
      :value="modelValue"
      @input="handleInput" />
    <div class="mt-4" v-if="tip || error">
      <p v-if="tip" data-testid="tip" class="text-sub text-gray">{{ tip }}</p>
      <p
        data-testid="error"
        v-if="error && error !== true"
        class="text-sub text-red">
        {{ error }}
      </p>
    </div>
  </label>
</template>
