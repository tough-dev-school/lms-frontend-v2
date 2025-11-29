<script setup lang="ts">
  import { computed } from 'vue';
  import { pick } from 'lodash-es';

  const props = defineProps<{
    error: { response: { data: Record<string, string[]> } } | null;
    whitelist?: string[];
  }>();

  const errors = computed(() => {
    if (!props.error?.response?.data) return {};

    const data = props.error.response.data;

    return props.whitelist
      ? (pick(data, props.whitelist) as Record<string, unknown>)
      : data;
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
      {{ key }}: {{ Array.isArray(error) ? error.join(', ') : error }}
    </li>
  </ul>
</template>
