<script lang="ts" setup>
  import { RouterLink } from 'vue-router';

  export interface Breadcrumb {
    name: string;
    // #FIXME
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to?: any;
  }

  interface Props {
    items: Breadcrumb[];
  }

  const props = defineProps<Props>();
</script>

<template>
  <nav>
    <ol class="flex items-center flex-wrap gap-4">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="flex items-center gap-4">
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400">/</span>
        </template>
        <RouterLink
          v-if="item.to"
          :class="index === props.items.length - 1 ? 'font-bold' : ''"
          :to="item.to">
          {{ item.name }}
        </RouterLink>
      </li>
    </ol>
  </nav>
</template>
