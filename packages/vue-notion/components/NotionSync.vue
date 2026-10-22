<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { isType } = useBlock(props);
</script>

<template>
  <div
    v-if="isType('transclusion_container')"
    class="notion-sync-block"
  >
    <slot />
  </div>
</template>
