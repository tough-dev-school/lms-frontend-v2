<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionFigure from './NotionFigure.vue';
  import NotionRenderer from './NotionRenderer.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, value, properties, title } = useBlock(props);

  // An image as the first child is shown right under the todo text
  const imageBlock = computed(() => {
    const imageId = value.value?.content?.[0];
    return imageId ? props.blockMap[imageId] : undefined;
  });

  const imageUrl = computed(
    () => imageBlock.value?.value.properties?.source?.[0]?.[0] || null,
  );

  const filteredContent = computed(() => {
    const content = value.value?.content ?? [];
    if (imageBlock.value?.value.type === 'image' && imageUrl.value) {
      return content.slice(1);
    }
    return content;
  });
</script>

<template>
  <div class="notion-todo-item-wrapper">
    <label class="notion-to-do-item">
      <span class="notion-checkbox-wrapper">
        <!-- The app enables the checkbox and stores its state -->
        <input
          type="checkbox"
          :value="properties?.checked"
          :checked="!!properties?.checked"
          disabled
        />
      </span>
      <div :class="{ 'notion-to-do-checked': properties?.checked }">
        <NotionTextRenderer
          :text="title"
          v-bind="pass"
        />
      </div>
    </label>
    <div v-if="imageBlock && imageUrl">
      <NotionFigure
        v-bind="pass"
        :content-id="imageBlock.value.id"
      />
    </div>
    <div v-if="value?.content">
      <NotionRenderer
        v-for="(childId, childIndex) in filteredContent"
        v-bind="pass"
        :key="childId"
        :level="level + 1"
        :content-id="childId"
        :content-index="childIndex"
      />
    </div>
  </div>
</template>
