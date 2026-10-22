<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const { pass, f, title, description, properties, getTextContent } =
    useBlock(props);

  const link = computed(() => properties.value?.link);
</script>

<template>
  <div class="notion-row">
    <a
      target="_blank"
      rel="noopener noreferrer"
      :class="['notion-bookmark', f.block_color && `notion-${f.block_color}`]"
      :href="link && getTextContent(link)"
    >
      <div>
        <div class="notion-bookmark-title">
          <NotionTextRenderer
            :text="title || link"
            v-bind="pass"
          />
        </div>
        <div
          v-if="description"
          class="notion-bookmark-description"
        >
          <NotionTextRenderer
            :text="description"
            v-bind="pass"
          />
        </div>
        <div class="notion-bookmark-link">
          <img
            v-if="f.bookmark_icon"
            :alt="getTextContent(title || link || [])"
            :src="f.bookmark_icon"
          />
          <div>
            <NotionTextRenderer
              :text="link"
              v-bind="pass"
            />
          </div>
        </div>
      </div>
      <div
        v-if="f.bookmark_cover"
        class="notion-bookmark-image"
      >
        <img
          :alt="getTextContent(title || link || [])"
          :src="f.bookmark_cover"
        />
      </div>
    </a>
  </div>
</template>
