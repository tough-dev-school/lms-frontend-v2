<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import { getListNumber } from '../lib/utils';
  import NotionNestedList from './NotionNestedList.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, value, title, type, parent } = useBlock(props);

  const start = computed(() =>
    value.value ? getListNumber(value.value.id, props.blockMap) : undefined,
  );

  // A child item of the same type is rendered inside the parent's list
  const isTopLevel = computed(() => type.value !== parent.value?.value?.type);
</script>

<template>
  <ul
    v-if="isTopLevel && type === 'bulleted_list'"
    class="notion-list notion-list-disc"
  >
    <li>
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </li>
    <NotionNestedList
      v-if="value?.content"
      v-bind="pass"
    >
      <slot />
    </NotionNestedList>
  </ul>
  <ol
    v-else-if="isTopLevel && type === 'numbered_list'"
    class="notion-list notion-list-numbered"
    :start="start"
  >
    <li>
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </li>
    <NotionNestedList
      v-if="value?.content"
      v-bind="pass"
    >
      <slot />
    </NotionNestedList>
  </ol>
  <span v-else>
    <li>
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </li>
    <NotionNestedList
      v-if="value?.content"
      v-bind="pass"
    >
      <slot />
    </NotionNestedList>
  </span>
</template>
