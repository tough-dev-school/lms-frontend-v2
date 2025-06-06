<template>
  <div class="notion-todo-item-wrapper">
    <label class="notion-to-do-item">
      <span class="notion-checkbox-wrapper">
        <input
          type="checkbox"
          :value="properties.checked"
          :checked="properties.checked"
          disabled="true" />
      </span>
      <div :class="{ 'notion-to-do-checked': properties.checked }">
        <NotionTextRenderer :text="title" v-bind="pass" />
      </div>
    </label>
    <div v-if="imageUrl" class="notion-todo-image">
      <img :src="imageUrl" :alt="imageAlt" @error="handleImageError" />
    </div>
  </div>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  export default {
    name: 'NotionTodo',
    components: {
      NotionTextRenderer,
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
      imageAlt() {
        if (!this.imageBlock) return '';
        return (
          this.imageBlock.value.properties?.caption?.[0]?.[0] ||
          'Todo item image'
        );
      },
    },
    methods: {
      handleImageError(e) {
        console.error('Ошибка загрузки изображения:', e.target.src);
      },
    },
  };
</script>
