<script setup lang="ts">
  import { computed } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';
  import { useBlock } from '../lib/useBlock';
  import NotionPageIcon from './NotionPageIcon.vue';
  import NotionTextRenderer from './NotionTextRenderer.vue';

  const props = withDefaults(defineProps<BlockProps>(), blockPropsDefaults);
  const {
    pass,
    value,
    format,
    title,
    hasPageLinkOptions,
    pageLinkProps,
    getTextContent,
  } = useBlock(props);

  const coverStyle = computed(() => {
    const coverPosition =
      (1 - (format.value?.page_cover_position || 0.5)) * 100;
    return { objectPosition: `center ${coverPosition}%` };
  });
</script>

<template>
  <div
    v-if="level === 0 && fullPage"
    class="notion"
  >
    <!-- todo: hide image if no .format is available -->
    <img
      v-if="format?.page_cover"
      class="notion-page-cover"
      :style="coverStyle"
      :alt="title ? getTextContent(title) : ''"
      :src="format.page_cover"
    />
    <main
      :class="[
        'notion-page',
        format && !format.page_cover && 'notion-page-offset',
        format?.page_full_width && 'notion-full-width',
        format?.page_small_text && 'notion-small-text',
      ]"
    >
      <NotionPageIcon
        v-bind="pass"
        big
      />
      <div class="notion-title">
        <NotionTextRenderer
          :text="title"
          v-bind="pass"
        />
      </div>
      <slot />
    </main>
  </div>
  <main
    v-else-if="level === 0"
    class="notion"
  >
    <slot />
  </main>
  <component
    v-bind="pageLinkProps(value?.id ?? '')"
    :is="pageLinkOptions?.component"
    v-else-if="hasPageLinkOptions"
    class="notion-page-link"
  >
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </div>
  </component>
  <a
    v-else
    class="notion-page-link"
    :target="pageLinkTarget"
    :href="mapPageUrl(value?.id ?? '')"
  >
    <div class="notion-page-icon">
      <NotionPageIcon v-bind="pass" />
    </div>
    <div class="notion-page-text">
      <NotionTextRenderer
        :text="title"
        v-bind="pass"
      />
    </div>
  </a>
</template>
