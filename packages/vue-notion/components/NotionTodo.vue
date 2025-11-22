<template>
  <div class="notion-todo-item-wrapper">
    <label class="notion-to-do-item">
      <span class="notion-checkbox-wrapper">
        <input
          type="checkbox"
          :value="properties.checked"
          :checked="properties.checked"
          disabled="true"
        />
      </span>
      <div :class="{ 'notion-to-do-checked': properties.checked }">
        <NotionTextRenderer
          :text="title"
          v-bind="pass"
        />
      </div>
    </label>
    <div
      v-if="imageBlock && imageUrl"
      class="notion-todo-image"
    >
      <NotionImage
        v-bind="pass"
        :block="imageBlock"
        :content-id="block.value.content[0]"
      />
    </div>
    <div v-if="block.value.content">
      <NotionRenderer
        v-for="(contentId, contentIndex) in filteredContent"
        v-bind="pass"
        :key="contentId"
        :level="pass.level + 1"
        :content-id="contentId"
        :content-index="contentIndex"
      />
    </div>
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';
  import NotionImage from './NotionImage.vue';
  import { defineAsyncComponent } from 'vue';

  export default {
    name: 'NotionTodo',
    components: {
      NotionTextRenderer,
      NotionImage,
      NotionRenderer: defineAsyncComponent(
        () => import('./NotionRenderer.vue'),
      ),
    },
    extends: Blockable,
    computed: {
      imageBlock() {
        const imageId = this.block.value.content?.[0];
        return imageId ? this.pass.blockMap[imageId] : null;
      },
      imageUrl() {
        if (!this.imageBlock) return null;
        return this.imageBlock.value.properties?.source?.[0]?.[0] || null;
      },
      filteredContent() {
        if (!this.block.value.content) return [];
        const firstChildId = this.block.value.content[0];
        const firstChild = firstChildId
          ? this.pass.blockMap[firstChildId]
          : null;
        if (firstChild?.value.type === 'image' && this.imageUrl) {
          return this.block.value.content.slice(1);
        }
        return this.block.value.content;
      },
    },
  };
</script>
