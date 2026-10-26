<script setup lang="ts">
  import type GLightbox from 'glightbox';
  import { computed, onBeforeUnmount, onMounted } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { f, src, alt } = useBlock(props);

  // Notion stores 1 for "fit to container"
  const isFull = (size: unknown) => Number(size) === 1;

  const width = computed(() =>
    isFull(f.value.block_width) || f.value.block_page_width
      ? '100%'
      : `${f.value.block_width}px`,
  );

  const basicStyle = computed(() => ({
    width: width.value,
    height: isFull(f.value.block_height) ? '100%' : `${f.value.block_height}px`,
  }));

  const aspectRatioStyle = computed(() => {
    const aspectRatio =
      isFull(f.value.block_width) ||
      isFull(f.value.block_height) ||
      f.value.block_aspect_ratio
        ? 1 / Number(f.value.block_aspect_ratio)
        : `${f.value.block_width} / ${f.value.block_height} `;

    return {
      width: width.value,
      height: '100%',
      maxWidth: '100%',
      position: 'relative' as const,
      aspectRatio,
    };
  });

  let lightbox: ReturnType<typeof GLightbox> | undefined;

  let isUnmounted = false;

  // glightbox reads `document` as soon as it loads, so it can't be imported during SSR
  onMounted(async () => {
    const [{ default: createLightbox }] = await Promise.all([
      import('glightbox'),
      import('glightbox/dist/css/glightbox.css'),
    ]);
    if (isUnmounted) return;

    lightbox = createLightbox({
      selector: `[data-lightbox="${props.contentId}"]`,
      openEffect: 'zoom',
      closeEffect: 'none',
    });
  });

  onBeforeUnmount(() => {
    isUnmounted = true;
    lightbox?.destroy();
  });
</script>

<template>
  <a
    class="relative block"
    :href="src"
    :data-lightbox="contentId"
    :style="f.block_aspect_ratio ? aspectRatioStyle : basicStyle"
  >
    <img
      class="notion-image-inset"
      :alt="alt || 'Notion image'"
      :src="src"
    />
  </a>
</template>
