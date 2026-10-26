<script setup lang="ts">
  import { computed } from 'vue';
  import type { Component } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionBookmark from './NotionBookmark.vue';
  import NotionCallout from './NotionCallout.vue';
  import NotionCode from './NotionCode.vue';
  import NotionColumn from './NotionColumn.vue';
  import NotionColumnList from './NotionColumnList.vue';
  import NotionDivider from './NotionDivider.vue';
  import NotionEquation from './NotionEquation.vue';
  import NotionFigure from './NotionFigure.vue';
  import NotionHeader from './NotionHeader.vue';
  import NotionList from './NotionList.vue';
  import NotionPage from './NotionPage.vue';
  import NotionQuote from './NotionQuote.vue';
  import NotionSync from './NotionSync.vue';
  import NotionSyncPointer from './NotionSyncPointer.vue';
  import NotionTable from './NotionTable.vue';
  import NotionTableOfContents from './NotionTableOfContents.vue';
  import NotionTableRow from './NotionTableRow.vue';
  import NotionText from './NotionText.vue';
  import NotionTodo from './NotionTodo.vue';
  import NotionToggle from './NotionToggle.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);

  const BLOCK_COMPONENTS = new Map<string, Component>([
    ['page', NotionPage],
    ['header', NotionHeader],
    ['sub_header', NotionHeader],
    ['sub_sub_header', NotionHeader],
    ['table_of_contents', NotionTableOfContents],
    ['bookmark', NotionBookmark],
    ['callout', NotionCallout],
    ['code', NotionCode],
    ['equation', NotionEquation],
    ['text', NotionText],
    ['quote', NotionQuote],
    ['to_do', NotionTodo],
    ['toggle', NotionToggle],
    ['column_list', NotionColumnList],
    ['column', NotionColumn],
    ['bulleted_list', NotionList],
    ['numbered_list', NotionList],
    ['image', NotionFigure],
    ['embed', NotionFigure],
    ['figma', NotionFigure],
    ['video', NotionFigure],
    ['audio', NotionFigure],
    ['table', NotionTable],
    ['transclusion_container', NotionSync],
    ['table_row', NotionTableRow],
    ['divider', NotionDivider],
    ['transclusion_reference', NotionSyncPointer],
  ]);

  const { pass, type, visible } = useBlock(props);

  // Hidden types fall through to the "not implemented" placeholder
  const component = computed(() =>
    visible.value && type.value ? BLOCK_COMPONENTS.get(type.value) : undefined,
  );
</script>

<template>
  <component
    :is="component"
    v-if="component"
    :data-block-type="type"
    v-bind="pass"
  >
    <slot />
  </component>
  <div v-else>Block type not implemented: {{ type }}</div>
</template>
