<script lang="ts" setup>
  import { withDefaults } from 'vue';

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
    tags: 'text',
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
    <div class="mb-8 text-gray empty:hidden" data-testid="label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <input
      :type="type"
      v-bind="$attrs"
      class="block h-module w-full rounded border border-gray bg-offwhite p-module px-16 leading-1.5 text-black placeholder:text-gray focus:border-blue focus:outline-none"
      :class="{
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

<style>
  input[type='password'] {
    font-family: Verdana;
    letter-spacing: 0.125em;
  }
</style>
