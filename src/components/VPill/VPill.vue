<script lang="ts">
  export interface PillItem {
    label: string;
    to?: string;
  }
</script>

<script lang="ts" setup>
  defineProps<{
    items: PillItem[];
  }>();
</script>

<template>
  <div
    :style="{
      '--items': items.length,
      'grid-template-columns': `repeat(var(--items), 1fr)`,
    }"
    class="grid min-h-72 phone:flex-row rounded-8 bg-white overflow-hidden">
    <component
      :is="item.to ? 'a' : 'div'"
      v-for="(item, index) in items"
      :key="item.label"
      data-testid="pill-item"
      class="py-16 flex-grow text-center font-medium"
      :class="{
        'hover:bg-lightgray hover:bg-opacity-20 cursor-pointer link': item.to,
      }"
      :href="item.to">
      <div
        class="p-8"
        :class="{
          'border-r border-lightgray':
            items.length > 1 && index !== items.length - 1,
        }">
        {{ item.label }}
      </div>
    </component>
  </div>
</template>
