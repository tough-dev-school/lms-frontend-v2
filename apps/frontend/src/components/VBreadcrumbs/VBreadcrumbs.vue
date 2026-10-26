<script lang="ts" setup>
  import { Link } from '@inertiajs/vue3';

  export interface Breadcrumb {
    name: string;
    href?: string;
  }

  interface Props {
    items: Breadcrumb[];
  }

  const props = defineProps<Props>();
</script>

<template>
  <nav>
    <ol class="flex flex-wrap items-center gap-4">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="flex items-center gap-4"
      >
        <template v-if="index > 0">
          <span class="mx-2 text-gray-400">/</span>
        </template>
        <Link
          v-if="item.href"
          :class="index === props.items.length - 1 ? 'font-bold' : ''"
          :href="item.href"
        >
          {{ item.name }}
        </Link>
      </li>
    </ol>
  </nav>
</template>
