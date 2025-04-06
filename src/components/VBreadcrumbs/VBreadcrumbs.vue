<script lang="ts" setup>
  import { RouterLink } from 'vue-router';

  export interface Breadcrumb {
    name: string;
    to?: any;
  }

  interface Props {
    items: Breadcrumb[];
  }

  const props = defineProps<Props>();
</script>

<template>
  <nav class="mb-16">
    <ol class="flex items-center gap-2">
      <li v-for="(item, index) in props.items" :key="index">
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400">/</span>
        </template>
        <RouterLink v-if="item.to" :to="item.to" class="link text-sm">
          {{ item.name }}
        </RouterLink>
        <span v-else class="text-sm font-medium">{{ item.name }}</span>
      </li>
    </ol>
  </nav>
</template>
