<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import type { RichText } from '../lib/types';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, properties, parent } = useBlock(props);

  const tableFormat = computed(() => parent.value?.value?.format);
  const columns = computed(() => tableFormat.value?.table_block_column_order);

  // An empty cell still needs text, or the row collapses
  const EMPTY_CELL: RichText = [[' ']];
  const cell = (columnId: string) => properties.value?.[columnId] ?? EMPTY_CELL;

  const isHeader = (columnIndex: number) =>
    (!!tableFormat.value?.table_block_column_header &&
      props.contentIndex === 0) ||
    (!!tableFormat.value?.table_block_row_header && columnIndex === 0);
</script>

<template>
  <tr class="notion-simple-table-row">
    <td
      v-for="(columnId, columnIndex) in columns"
      :key="columnIndex"
      class="notion-simple-table-data"
    >
      <div :class="{ 'notion-simple-table-header': isHeader(columnIndex) }">
        <div class="notion-simple-table-cell-text">
          <NotionTextRenderer
            :text="cell(columnId)"
            v-bind="pass"
          />
        </div>
      </div>
    </td>
  </tr>
</template>
