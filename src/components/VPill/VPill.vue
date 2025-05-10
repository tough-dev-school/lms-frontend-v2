<script lang="ts">
  import type { RouteLocationRaw } from 'vue-router';

  export interface PillItem {
    label: string;
    to?: RouteLocationRaw;
  }
</script>

<script lang="ts" setup>
  import { RouterLink } from 'vue-router';

  defineProps<{
    items: PillItem[];
  }>();
</script>

<template>
  <div
    class="flex-col flex min-h-72 phone:flex-row rounded-8 bg-white overflow-hidden">
    <component
      :is="item.to ? RouterLink : 'div'"
      v-for="(item, index) in items"
      :key="item.label"
      data-testid="pill-item"
      class="py-16 flex-grow text-center"
      :class="{
        'hover:bg-lightgray hover:bg-opacity-20 cursor-pointer': item.to,
      }"
      :to="item.to">
      <div
        class="px-40 py-8"
        :class="{
          'border-r border-lightgray font-medium ':
            items.length > 1 && index !== items.length - 1,
        }">
        {{ item.label }}
      </div>
    </component>
  </div>
</template>
