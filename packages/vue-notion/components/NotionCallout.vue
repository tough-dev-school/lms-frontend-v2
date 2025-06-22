<template>
  <div :class="['notion-callout', blockColorClass(), blockColorClass('_co')]">
    <div>
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-callout-text">
      <div
        v-if="block.value.content && block.value.properties?.title"
        class="notion-callout-title">
        <NotionTextRenderer :text="title" v-bind="pass" />
      </div>
      <NotionTextRenderer v-else :text="title" v-bind="pass" />
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
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionPageIcon from './NotionPageIcon.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';
  import { defineAsyncComponent } from 'vue';

  export default {
    components: {
      NotionPageIcon,
      NotionTextRenderer,
      NotionRenderer: defineAsyncComponent(
        () => import('./NotionRenderer.vue'),
      ),
    },
    extends: Blockable,
  };
</script>
