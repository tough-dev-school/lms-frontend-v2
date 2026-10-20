<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import type { RichText } from '../lib/types';
  import NotionDecorator from './NotionDecorator.vue';

  const props = withDefaults(
    defineProps<BlockProps & { text?: RichText }>(),
    blockPropsDefaults,
  );
  const { pass } = useBlock(props);
</script>

<template>
  <span>
    <NotionDecorator
      v-for="(chunk, i) in text"
      :key="i"
      :content="chunk"
      v-bind="pass"
    />
  </span>
</template>
