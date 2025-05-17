<script lang="ts">
  export type PillItem =
    | {
        label: string;
        to?: string;
      }
    | string;
</script>

<script lang="ts" setup>
  defineProps<{
    items: PillItem[];
  }>();

  const MAX_ITEMS_PER_ROW = 5;

  const needBorder = (length: number, index: number) => {
    return (
      (length > 1 && index !== length - 1) ||
      (length > MAX_ITEMS_PER_ROW && index % MAX_ITEMS_PER_ROW !== 0)
    );
  };
</script>

<template>
  <div
    class="flex flex-col phone:grid phone:grid-cols-[repeat(auto-fill,minmax(0,1fr))] grid-cols-1 min-h-72 rounded-8 bg-white overflow-hidden"
    style="
      grid-template-columns: repeat(
        min(var(--max-items, 5), var(--items)),
        1fr
      );
    "
    :style="{ '--items': items.length }">
    <template v-for="(item, index) in items" :key="index">
      <template v-if="typeof item !== 'string'">
        <component
          :is="item.to ? 'a' : 'div'"
          data-testid="pill-item"
          class="py-16 w-full flex justify-center items-center text-center font-medium"
          :class="{
            'hover:bg-lightgray hover:bg-opacity-20 cursor-pointer link':
              item.to,
            'phone:border-r phone:!border-r-lightgray border-b !border-b-lightgray phone:border-b-0':
              needBorder(items.length, index),
          }"
          :href="item.to">
          {{ item.label }}
        </component>
      </template>
      <slot v-else :name="`pill-${item}`" />
    </template>
  </div>
</template>
