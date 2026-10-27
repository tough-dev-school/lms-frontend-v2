<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, properties, title } = useBlock(props);
</script>

<template>
  <blockquote
    v-if="properties"
    class="notion-quote"
  >
    <NotionTextRenderer
      :text="title"
      v-bind="pass"
    />
  </blockquote>
</template>
