<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { f, src, type } = useBlock(props);

  const assetSrc = computed(() =>
    type.value === 'figma' ? src.value : f.value.display_source,
  );

  const style = computed(() => {
    const aspectRatio =
      f.value.block_aspect_ratio ||
      Number(f.value.block_height) / Number(f.value.block_width);
    return {
      paddingBottom: `${aspectRatio * 100}%`,
      position: 'relative' as const,
    };
  });
</script>

<template>
  <div :style="style">
    <iframe
      class="notion-image-inset"
      :src="assetSrc"
      :allow="embedAllow"
    />
  </div>
</template>
