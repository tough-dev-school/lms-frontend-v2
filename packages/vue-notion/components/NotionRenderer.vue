<template>
  <NotionBlock
    v-if="blockMap && value"
    v-bind="pass"
    :ref="level === 0 ? 'rootBlock' : null"
    :style="{
      paddingLeft: `${level > 1 ? `${level * 10}px` : undefined}`,
    }"
  >
    <NotionRenderer
      v-for="(contentId, contentIndex) in value.content"
      v-bind="pass"
      :id="uuidToId(contentId)"
      :key="contentId"
      :level="level + 1"
      :content-id="contentId"
      :content-index="contentIndex"
      style="overflow-wrap: break-word"
    />
  </NotionBlock>
</template>

<script>
  import { Blockable } from '../lib/blockable';
  import NotionBlock from './NotionBlock.vue';

  import { defaultMapPageUrl } from '../lib/utils';

  export default {
    components: {
      NotionBlock,
    },
    extends: Blockable,
    props: {
      blockMap: [Object],
      contentId: String,
      contentIndex: { type: Number, default: 0 },
      fullPage: { type: Boolean, default: false },
      hideList: { type: Array, default: () => [] },
      level: { type: Number, default: 0 },
      mapPageUrl: { type: Function, default: defaultMapPageUrl },
      pageLinkOptions: Object,
      imageOptions: Object,
      todo: { type: Boolean, default: false },
    },
    emits: ['bookmark', 'mounted'],
    data() {
      return {
        observer: null,
        mutationObserver: null,
        currentBlockId: null,
      };
    },
    mounted() {
      if (this.level === 0) {
        this.setupScrollObserver();
      }
      this.$emit('mounted');
    },
    beforeUnmount() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    },
    methods: {
      uuidToId(uuid) {
        return uuid.replaceAll('-', '');
      },
      setupScrollObserver() {
        if (typeof IntersectionObserver === 'undefined') {
          return;
        }

        const options = {
          root: null,
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        };

        this.observer = new IntersectionObserver((entries) => {
          let mostVisibleEntry = null;
          let maxRatio = 0;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              maxRatio = entry.intersectionRatio;
              mostVisibleEntry = entry;
            }
          });

          if (mostVisibleEntry && mostVisibleEntry.target.id) {
            const blockId = mostVisibleEntry.target.id;
            if (this.currentBlockId !== blockId) {
              this.currentBlockId = blockId;
              this.updateUrlHash(blockId);
            }
          }
        }, options);

        this.$nextTick(() => {
          this.observeBlocks();
        });

        if (typeof MutationObserver !== 'undefined') {
          const mutationObserver = new MutationObserver(() => {
            this.$nextTick(() => {
              this.observeBlocks();
            });
          });

          const container = this.$el?.closest('.notion') || document.body;
          mutationObserver.observe(container, {
            childList: true,
            subtree: true,
          });

          this.mutationObserver = mutationObserver;
        }
      },
      observeBlocks() {
        if (!this.observer) return;

        const container = this.$el?.closest('.notion') || document;
        const blocks = container.querySelectorAll('[id]');

        blocks.forEach((block) => {
          if (block.id && !block.hasAttribute('data-observed')) {
            const hasBlockType =
              block.hasAttribute('data-block-type') ||
              block.querySelector('[data-block-type]') !== null;
            if (hasBlockType) {
              block.setAttribute('data-observed', 'true');
              this.observer.observe(block);
            }
          }
        });
      },
      updateUrlHash(blockId) {
        if (!blockId) return;

        this.$emit('bookmark', blockId);
      },
    },
  };
</script>
