<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import { onMounted, ref, useTemplateRef } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';

  // Declared so renderer props don't land on the root element as attributes
  withDefaults(defineProps<BlockProps>(), blockPropsDefaults);

  const wrapper = useTemplateRef('wrapper');
  const isScrollable = ref(false);
  const isAtEnd = ref(false);

  const checkScrollPosition = () => {
    if (!wrapper.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = wrapper.value;
    // 1px slack for subpixel rounding
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 1;
  };

  const checkScrollable = () => {
    if (!wrapper.value) return;
    isScrollable.value = wrapper.value.scrollWidth > wrapper.value.clientWidth;
    checkScrollPosition();
  };

  onMounted(checkScrollable);
  useEventListener(window, 'resize', checkScrollable);
</script>

<template>
  <div>
    <div
      class="notion-simple-table-container"
      :class="{ 'is-at-end': isAtEnd }"
    >
      <div
        ref="wrapper"
        class="notion-simple-table-wrapper"
        @scroll="checkScrollPosition"
      >
        <table class="notion-simple-table">
          <tbody>
            <slot />
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="isScrollable"
      class="scroll-tip"
    >
      Таблица прокручивается →
    </div>
  </div>
</template>

<style scoped>
  .scroll-tip {
    text-align: right;
    font-size: 0.875rem;
    color: #999;
    padding: 0.5rem;
  }
</style>
