<script setup lang="ts">
  import type { TocItem } from '../lib/types';
  import { uuidToId } from '../lib/utils';

  defineProps<{ item: TocItem }>();
</script>

<template>
  <li class="table-of-contents-item">
    <a
      class="notion-link"
      :href="`#${uuidToId(item.id)}`"
      >{{ item.title }}</a
    >
    <ul>
      <NotionTableOfContentsItem
        v-for="subItem in item.sub"
        :key="subItem.id"
        :item="subItem"
      />
    </ul>
  </li>
</template>

<style>
  .table-of-contents-item.table-of-contents-item {
    margin-left: 1em;
    margin: 8px 8px 8px 16px;
  }
</style>
