<script lang="ts" setup>
  export type AllowedTags =
    | 'text'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'url'
    | 'week';

  export interface Props {
    label?: string;
    tip?: string;
    error?: boolean | string;
    modelValue: string;
    type?: AllowedTags;
  }

  withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    error: undefined,
    tip: undefined,
    label: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  const handleInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  };
</script>

<template>
  <label class="w-full">
    <div
      v-if="$slots.label || label"
      class="mb-8"
      :class="{ 'text-red': error }"
      data-testid="label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <input
      :type="type"
      v-bind="$attrs"
      class="leading-1.5 block h-module w-full rounded-8 border bg-white p-module text-black placeholder:text-gray focus:border-blue focus:outline-none border-white"
      :class="{
        'border-red': error,
      }"
      data-testid="input"
      :value="modelValue"
      @input="handleInput"
    >
    <div v-if="tip || error" class="mt-4">
      <p v-if="tip" data-testid="tip" class="text-sub text-gray">{{ tip }}</p>
      <p
        v-if="error && error !== true"
        data-testid="error"
        class="text-sub text-red"
      >
        {{ error }}
      </p>
    </div>
  </label>
</template>

<style>
  input[type='password'] {
    font-family: Verdana;
    letter-spacing: 0.125em;
  }
</style>
