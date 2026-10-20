<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import { KATEX_ELEMENT } from '../lib/utils';
  import NotionCode from './NotionCode.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, properties } = useBlock(props);

  const equation = computed(() => properties.value?.title?.[0]?.[0]);
</script>

<template>
  <div v-if="katex">
    <component
      :is="KATEX_ELEMENT"
      :expression="equation"
    />
  </div>
  <NotionCode
    v-else
    v-bind="pass"
    override-lang="latex"
  />
</template>
