<script lang="ts" setup>
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';

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
    error?: FormError;
    modelValue?: string;
    type?: AllowedTags;
    name: string;
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

  const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    emit('update:modelValue', value);
  };
</script>

<template>
  <label class="w-full">
    <div
      v-if="$slots.label || label"
      class="mb-8"
      data-testid="label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <input
      :type="type"
      v-bind="$attrs"
      class="leading-1.5 block h-module w-full rounded-8 border border-white bg-white p-module text-black placeholder:text-gray focus:border-blue focus:outline-none"
      :class="{
        'border-red': error,
      }"
      data-testid="input"
      :value="modelValue"
      @input="handleInput"
    />
    <div
      v-if="tip || error"
      class="mt-4"
    >
      <p
        v-if="tip"
        data-testid="tip"
        class="text-sub text-gray"
      >
        {{ tip }}
      </p>
      <VError
        :error="error"
        :whitelist="[name]"
      />
    </div>
  </label>
</template>

<style>
  input[type='password'] {
    font-family: Verdana;
    letter-spacing: 0.125em;
  }
</style>
