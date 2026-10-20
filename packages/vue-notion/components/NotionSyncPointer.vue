<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionRenderer from './NotionRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, format } = useBlock(props);

  const referencePointerId = computed(
    () => format.value?.transclusion_reference_pointer?.id,
  );
</script>

<template>
  <NotionRenderer
    v-bind="pass"
    :content-id="referencePointerId"
  />
</template>
