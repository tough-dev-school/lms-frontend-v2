<script lang="ts" setup>
  import VError from '@/components/VError/VError.vue';
  import { computed } from 'vue';
  import type { FormError } from '@/types/error';
  import { getErrorData } from '@/types/error';

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

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    error: undefined,
    tip: undefined,
    label: undefined,
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();

  // Inertia always passes an errors object, so only this field's message counts
  const hasError = computed(() => !!getErrorData(props.error)[props.name]);

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
        'border-red': hasError,
      }"
      data-testid="input"
      :value="modelValue"
      @input="handleInput"
    />
    <div
      v-if="tip || hasError"
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
