<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(
    defineProps<BlockProps & { big?: boolean }>(),
    blockPropsDefaults,
  );
  const { icon, format, title, getTextContent } = useBlock(props);
</script>

<template>
  <img
    v-if="icon.includes('http')"
    :class="[
      format?.page_cover && 'notion-page-icon-offset',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]"
    :src="icon"
    :alt="title ? getTextContent(title) : 'Icon'"
  />
  <span
    v-else-if="icon"
    role="img"
    :aria-label="icon"
    :class="[
      'notion-emoji',
      format?.page_cover && 'notion-page-icon-offset',
      big ? 'notion-page-icon-cover' : 'notion-page-icon',
    ]"
  >
    {{ icon }}
  </span>
</template>
