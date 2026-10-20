<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, title, type } = useBlock(props);
</script>

<template>
  <h1
    v-if="type === 'header'"
    class="notion-h1"
  >
    <NotionTextRenderer
      :text="title"
      v-bind="pass"
    />
  </h1>
  <h2
    v-else-if="type === 'sub_header'"
    class="notion-h2"
  >
    <NotionTextRenderer
      :text="title"
      v-bind="pass"
    />
  </h2>
  <h3
    v-else-if="type === 'sub_sub_header'"
    class="notion-h3"
  >
    <NotionTextRenderer
      :text="title"
      v-bind="pass"
    />
  </h3>
</template>
