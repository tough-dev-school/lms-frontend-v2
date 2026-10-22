<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionRenderer from './NotionRenderer.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, value, properties, title, blockColorClass } = useBlock(props);
</script>

<template>
  <p
    v-if="properties"
    :class="['notion-text', blockColorClass()]"
  >
    <NotionTextRenderer
      :text="title"
      v-bind="pass"
    />
  </p>
  <div
    v-else
    class="notion-text notion-blank"
  >
    &nbsp;
    <template v-if="value?.content">
      <NotionRenderer
        v-for="(childId, childIndex) in value.content"
        v-bind="pass"
        :key="childId"
        :level="level + 1"
        :content-id="childId"
        :content-index="childIndex"
      />
    </template>
  </div>
</template>
