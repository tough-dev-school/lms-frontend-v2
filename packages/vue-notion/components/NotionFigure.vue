<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionAsset from './NotionAsset.vue';
  import NotionImage from './NotionImage.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, caption, isType } = useBlock(props);
</script>

<template>
  <figure class="notion-asset-wrapper">
    <NotionImage
      v-if="isType('image')"
      v-bind="pass"
    />
    <NotionAsset
      v-else-if="isType(['embed', 'video', 'figma'])"
      v-bind="pass"
    />
    <figcaption
      v-if="caption"
      class="notion-image-caption"
    >
      <NotionTextRenderer
        :text="caption"
        v-bind="pass"
      />
    </figcaption>
  </figure>
</template>
