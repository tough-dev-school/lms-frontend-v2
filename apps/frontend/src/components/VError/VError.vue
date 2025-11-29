<script setup lang="ts">
  import { computed } from 'vue';
  import { pick } from 'lodash-es';

  const props = defineProps<{
    error: Error | null;
    whitelist?: string[];
  }>();

  interface BackendError {
    response: { data: Record<string, string[]> };
  }

  const errors = computed(() => {
    if (!props.error) return {};
    if ('response' in props.error) {
      const data = (props.error as BackendError).response.data;

      return props.whitelist
        ? (pick(data, props.whitelist) as Record<string, unknown>)
        : data;
    }
    return {};
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
      <template v-if="!!whitelist?.length === false">{{ key }}:</template>
      {{ Array.isArray(error) ? error.join(', ') : error }}
    </li>
  </ul>
</template>
