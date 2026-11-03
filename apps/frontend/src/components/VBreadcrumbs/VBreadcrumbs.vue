<script lang="ts" setup>
  import { RouterLink } from 'vue-router';

  export interface Breadcrumb {
    name: string;
    // #FIXME
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to?: any;
    // Short visible text, name stays as the accessible name
    label?: string;
  }

  interface Props {
    items: Breadcrumb[];
  }

  const props = defineProps<Props>();
</script>

<template>
  <nav class="text-sub">
    <ol class="flex flex-wrap items-center gap-x-8 gap-y-4">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="flex items-center gap-8"
      >
        <span
          v-if="index > 0"
          class="text-gray"
          aria-hidden="true"
        >
          /
        </span>
        <RouterLink
          v-if="item.to && index < props.items.length - 1"
          class="text-gray transition-colors hover:text-black dark:hover:text-white"
          :to="item.to"
          :aria-label="item.label ? item.name : undefined"
        >
          {{ item.label ?? item.name }}
        </RouterLink>
        <RouterLink
          v-if="item.to && index === props.items.length - 1"
          aria-current="page"
          :to="item.to"
          :aria-label="item.label ? item.name : undefined"
        >
          {{ item.label ?? item.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>
