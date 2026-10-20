<script setup lang="ts">
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionPageIcon from './NotionPageIcon.vue';
  import NotionRenderer from './NotionRenderer.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, value, title, blockColorClass } = useBlock(props);
</script>

<template>
  <div :class="['notion-callout', blockColorClass(), blockColorClass('_co')]">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <div
        v-if="value?.content && value.properties?.title"
        class="notion-callout-title"
      >
        <NotionTextRenderer
          :text="title"
          v-bind="pass"
        />
      </div>
      <NotionTextRenderer
        v-else
        :text="title"
        v-bind="pass"
      />
      <div
        v-if="value?.content"
        style="margin-left: -20px"
      >
        <NotionRenderer
          v-for="(childId, childIndex) in value.content"
          v-bind="pass"
          :key="childId"
          :level="level + 1"
          :content-id="childId"
          :content-index="childIndex"
        />
      </div>
    </div>
  </div>
</template>
