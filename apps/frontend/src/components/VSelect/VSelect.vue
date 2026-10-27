<script lang="ts">
  export interface SelectOption {
    value: string;
    label: string;
  }
</script>

<script lang="ts" setup>
  /* eslint-disable import-x/first */
  import { IconChevronDown } from '@tabler/icons-vue';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';

  export interface Props {
    options: SelectOption[];
    name: string;
    label?: string;
    tip?: string;
    error?: FormError;
  }

  withDefaults(defineProps<Props>(), {
    label: undefined,
    tip: undefined,
    error: undefined,
  });

  const model = defineModel<string>({ required: true });
</script>

<!-- The closed select looks like VTextInput, the list of options stays native, so it works with keyboard, screen readers and mobile pickers -->
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
    <div class="relative">
      <!-- Border colours are toggled, with both at once the border stays white because Tailwind puts border-white later in the CSS -->
      <select
        v-model="model"
        :name="name"
        class="leading-1.5 block h-module w-full cursor-pointer appearance-none truncate rounded-8 border bg-white p-module pr-40 text-black focus:border-blue focus:outline-none"
        :class="{
          'border-white': !error,
          'border-red': error,
        }"
        data-testid="select"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <IconChevronDown
        class="pointer-events-none absolute right-16 top-1/2 h-24 w-24 -translate-y-1/2 text-black"
        aria-hidden="true"
      />
    </div>
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
