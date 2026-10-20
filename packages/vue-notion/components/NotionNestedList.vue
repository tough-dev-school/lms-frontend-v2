<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { type } = useBlock(props);
</script>

<template>
  <ul
    v-if="type === 'bulleted_list'"
    class="notion-list notion-list-disc"
  >
    <slot />
  </ul>
  <ol
    v-else
    class="notion-list notion-list-numbered"
  >
    <slot />
  </ol>
</template>
