<template>
  <p v-if="properties" :class="['notion-text', blockColorClass()]">
    <NotionTextRenderer :text="title" v-bind="pass" />
  </p>
  <div v-else class="notion-text notion-blank">
    &nbsp;
    <template v-if="block.value.content">
      <NotionRenderer
        v-for="(contentId, contentIndex) in block.value.content"
        v-bind="pass"
        :key="contentId"
        :level="pass.level + 1"
        :content-id="contentId"
        :content-index="contentIndex" />
    </template>
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';
  import { defineAsyncComponent } from 'vue';

  export default {
    components: {
      NotionTextRenderer,
      NotionRenderer: defineAsyncComponent(
        () => import('./NotionRenderer.vue'),
      ),
    },
    extends: Blockable,
  };
</script>
