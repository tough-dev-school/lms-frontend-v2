<script setup lang="ts">
  import { useEventListener, useScrollLock } from '@vueuse/core';
  import { inject, nextTick, onMounted, ref, useTemplateRef } from 'vue';
  import { blockPropsDefaults } from '../lib/blockProps';
  import type { BlockProps } from '../lib/blockProps';

  // Declared so renderer props don't land on the root element as attributes
  withDefaults(defineProps<BlockProps>(), blockPropsDefaults);

  // The host app provides translated labels, so the renderer doesn't depend on an i18n library
  const labels = inject<{
    tableScrolls: string;
    openTable: string;
    closeTable: string;
  }>(
    'notionLabels',
    () => ({
      tableScrolls: 'Таблица прокручивается →',
      openTable: 'Открыть таблицу целиком',
      closeTable: 'Закрыть',
    }),
    true,
  );

  const wrapper = useTemplateRef('wrapper');
  const dialog = useTemplateRef('dialog');
  const isScrollable = ref(false);
  const isAtEnd = ref(false);
  const isOpen = ref(false);
  // showModal() doesn't stop the page behind the dialog from scrolling
  const isBodyLocked = useScrollLock(
    typeof document === 'undefined' ? null : document.body,
  );

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
  // Without a target vueuse uses the window when there is one, a bare `window` throws during SSR
  useEventListener('resize', checkScrollable);

  const open = async () => {
    isOpen.value = true;
    // The dialog is rendered only while open, so wait for it to exist
    await nextTick();
    dialog.value?.showModal();
    isBodyLocked.value = true;
  };

  const close = () => {
    dialog.value?.close();
  };

  // Fires for Escape and for close(), so cleanup lives in one place
  const onClose = () => {
    isOpen.value = false;
    isBodyLocked.value = false;
  };

  // A click on the backdrop targets the dialog element itself
  const onDialogClick = (event: MouseEvent) => {
    if (event.target === dialog.value) close();
  };
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
      class="table-toolbar"
    >
      <button
        type="button"
        class="notion-simple-table-open"
        @click="open"
      >
        {{ labels.openTable }}
      </button>
      <span class="scroll-tip">{{ labels.tableScrolls }}</span>
    </div>
    <dialog
      v-if="isOpen"
      ref="dialog"
      class="notion-simple-table-dialog"
      @close="onClose"
      @click="onDialogClick"
    >
      <button
        type="button"
        class="notion-simple-table-dialog-close"
        :aria-label="labels.closeTable"
        @click="close"
      >
        ×
      </button>
      <div class="notion-simple-table-dialog-body">
        <table class="notion-simple-table">
          <tbody>
            <slot />
          </tbody>
        </table>
      </div>
    </dialog>
  </div>
</template>

<style scoped>
  .table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0;
    font-size: 0.875rem;
  }

  .scroll-tip {
    margin-left: auto;
    color: #999;
  }

  .notion-simple-table-open {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  /*
   * The dialog is a transparent full-screen scroll area. Any click that lands
   * on it outside the card counts as a backdrop click, and the fixed close
   * button isn't clipped by the card's overflow.
   */
  .notion-simple-table-dialog[open] {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    margin: 0;
    padding: 56px 16px;
    border: none;
    background: transparent;
    overflow: auto;
    overscroll-behavior: contain;
  }

  /* Natural width, so browser zoom (pinch or ctrl/cmd + minus) can fit the whole table.
     margin: auto centers it but, unlike justify-content, keeps an overflowing card scrollable */
  .notion-simple-table-dialog-body {
    width: max-content;
    margin: auto;
    padding: 16px;
    border-radius: 12px;
  }

  .notion-simple-table-dialog::backdrop {
    background: rgba(0, 0, 0, 0.92);
  }

  .notion-simple-table-dialog-close {
    position: fixed;
    top: 8px;
    right: 8px;
    width: 40px;
    height: 40px;
    font-size: 32px;
    line-height: 1;
    color: #fff;
    cursor: pointer;
  }
</style>

<style>
  /* Unscoped with zero specificity, so the host app can theme the card */
  :where(.notion-simple-table-dialog-body) {
    background: #fff;
  }
</style>
