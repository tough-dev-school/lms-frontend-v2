<script setup lang="ts">
  import { computed } from 'vue';
  import { pick } from 'lodash-es';
  import type { FormError } from '@/types/error';
  import { getErrorData } from '@/types/error';

  const props = defineProps<{
    error: FormError;
    whitelist?: string[];
  }>();

  const errors = computed(() => {
    try {
      const errorData = getErrorData(props.error);

      if (Object.keys(errorData).length === 0) {
        return {};
      }

      return props.whitelist && props.whitelist.length > 0
        ? (pick(errorData, props.whitelist) as Record<
            string,
            string | string[]
          >)
        : errorData;
    } catch (error) {
      console.error('Error parsing error data:', error);
      return {};
    }
  });

  const showKey = computed(() => {
    return !props.whitelist || props.whitelist.length === 0;
  });
</script>

<template>
  <ul
    v-if="Object.keys(errors).length > 0"
    class="origin-left"
  >
    <li
      v-for="(error, key) in errors"
      :key="key"
      class="text-red"
    >
      <template v-if="showKey">{{ key }}:</template>
      {{ Array.isArray(error) ? error.join(', ') : error }}
    </li>
  </ul>
</template>
