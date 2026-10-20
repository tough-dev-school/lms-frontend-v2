<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, title } = useBlock(props);
</script>

<template>
  <details class="notion-toggle">
    <summary>
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </summary>
    <div>
      <slot />
    </div>
  </details>
</template>
