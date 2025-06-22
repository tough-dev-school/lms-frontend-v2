<template>
  <component :is="component" v-bind="pass" v-if="component" :format="format">
    <slot />
  </component>
  <div v-else>Block type not implemented: {{ type }}</div>
</template>

<script>
  import { getCurrentInstance } from 'vue';

  import { Blockable, blockComputed } from '../lib/blockable';

  import NotionBookmark from './NotionBookmark.vue';
  import NotionCallout from './NotionCallout.vue';
  import NotionCode from './NotionCode.vue';
  import NotionColumn from './NotionColumn.vue';
  import NotionEquation from './NotionEquation.vue';
  import NotionFigure from './NotionFigure.vue';
  import NotionHeader from './NotionHeader.vue';
  import NotionList from './NotionList.vue';
  import NotionPage from './NotionPage.vue';
  import NotionQuote from './NotionQuote.vue';
  import NotionSyncPointer from './NotionSyncPointer.vue';
  import NotionTable from './NotionTable.vue';
  import NotionTableRow from './NotionTableRow.vue';
  import NotionText from './NotionText.vue';
  import NotionTodo from './NotionTodo.vue';
  import NotionToggle from './NotionToggle.vue';
  import NotionTableOfContents from './NotionTableOfContents.vue';
  import NotionDivider from './NotionDivider.vue';
  import NotionSync from './NotionSync.vue';
  import NotionColumnList from './NotionColumnList.vue';

  export default {
    extends: Blockable,
    computed: {
      ...blockComputed,
      isRendererRegistered() {
        return 'NotionRenderer' in getCurrentInstance().appContext.components;
      },
      component() {
        if (this.isType('page')) {
          return NotionPage;
        } else if (this.isType(['header', 'sub_header', 'sub_sub_header'])) {
          return NotionHeader;
        } else if (this.isType('table_of_contents')) {
          return NotionTableOfContents;
        } else if (this.isType('bookmark')) {
          return NotionBookmark;
        } else if (this.isType('callout')) {
          return NotionCallout;
        } else if (this.isType('code')) {
          return NotionCode;
        } else if (this.isType('equation')) {
          return NotionEquation;
        } else if (this.isType('text')) {
          return NotionText;
        } else if (this.isType('quote')) {
          return NotionQuote;
        } else if (this.isType('to_do')) {
          return NotionTodo;
        } else if (this.isType('toggle')) {
          return NotionToggle;
        } else if (this.isType('column_list')) {
          return NotionColumnList;
        } else if (this.isType('column')) {
          return NotionColumn;
        } else if (this.isType(['bulleted_list', 'numbered_list'])) {
          return NotionList;
        } else if (this.isType(['image', 'embed', 'figma', 'video', 'audio'])) {
          return NotionFigure;
        } else if (this.isType('table')) {
          return NotionTable;
        } else if (this.isType('transclusion_container')) {
          return NotionSync;
        } else if (this.isType('table_row')) {
          return NotionTableRow;
        } else if (this.isType('divider')) {
          return NotionDivider;
        } else if (this.isType('transclusion_reference')) {
          return NotionSyncPointer;
        }
        return null;
      },
    },
  };
</script>
