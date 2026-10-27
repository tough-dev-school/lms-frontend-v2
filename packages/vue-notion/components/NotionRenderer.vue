<script setup lang="ts">
  import { onMounted, useTemplateRef } from 'vue';
  import type { ComponentPublicInstance } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import type { BlockMap } from '../lib/types';
  import { useBlock } from '../lib/useBlock';
  import { useBookmarkObserver } from '../lib/useBookmarkObserver';
  import { uuidToId } from '../lib/utils';
  import NotionBlock from './NotionBlock.vue';

  // blockMap is optional here so the app can mount the renderer before data loads
  const props = withDefaults(
    defineProps<Omit<BlockProps, 'blockMap'> & { blockMap?: BlockMap }>(),
    blockPropsDefaults,
  );

  const emit = defineEmits<{
    bookmark: [blockId: string];
    mounted: [];
  }>();

  const { pass, value } = useBlock(props);

  const rootBlock = useTemplateRef<ComponentPublicInstance>('rootBlock');

  // level never changes for a mounted renderer, so the observer is set up
  // only once, by the top one
  if (props.level === 0) {
    useBookmarkObserver(
      () => rootBlock.value?.$el,
      (blockId) => emit('bookmark', blockId),
    );
  }

  onMounted(() => emit('mounted'));
</script>

<template>
  <NotionBlock
    v-if="blockMap && value"
    ref="rootBlock"
    v-bind="pass"
    :block-map="blockMap"
    :style="{ paddingLeft: level > 1 ? `${level * 10}px` : undefined }"
  >
    <NotionRenderer
      v-for="(childId, childIndex) in value.content"
      v-bind="pass"
      :id="uuidToId(childId)"
      :key="childId"
      :level="level + 1"
      :content-id="childId"
      :content-index="childIndex"
      style="overflow-wrap: break-word"
    />
  </NotionBlock>
</template>
