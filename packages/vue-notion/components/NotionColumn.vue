<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  // Two root elements can't inherit attrs. Columns never got them, and
  // binding them now would add ids that the bookmark observer picks up.
  defineOptions({ inheritAttrs: false });

  const SPACER_WIDTH = 20;

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { format } = useBlock(props);

  const columnStyle = computed(() => {
    const ratio = format.value?.column_ratio ?? 1;
    const columns = Number((1 / ratio).toFixed(0));
    const totalWidth = (columns - 1) * SPACER_WIDTH;
    return { width: `calc((100% - ${totalWidth}px) * ${ratio})` };
  });
</script>

<template>
  <div
    class="notion-column"
    :style="columnStyle"
  >
    <slot />
  </div>
  <div
    class="notion-spacer"
    :style="{ width: `${SPACER_WIDTH}px` }"
  />
</template>
