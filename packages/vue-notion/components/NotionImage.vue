<template>
  <a
    v-if="f.block_aspect_ratio"
    class="block"
    :href="src"
    :data-lightbox="contentId"
    :style="aspectRatioStyle">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </a>
  <a
    v-else
    class="block"
    :href="src"
    :data-lightbox="contentId"
    :style="basicStyle">
    <img class="notion-image-inset" :alt="alt || 'Notion image'" :src="src" />
  </a>
</template>

<script>
  import { Blockable, blockComputed } from '../lib/blockable';
  import GLightbox from 'glightbox';
  import 'glightbox/dist/css/glightbox.css';

  export default {
    extends: Blockable,
    computed: {
      ...blockComputed,
      hasImageComponent() {
        return !!this.imageOptions?.component;
      },
      width() {
        return this.f.block_width == 1 || this.f.block_page_width
          ? '100%'
          : `${this.f.block_width}px`;
      },
      basicStyle() {
        return {
          width: this.width,
          height:
            this.f.block_height == 1 ? '100%' : `${this.f.block_height}px`,
        };
      },
      aspectRatioStyle() {
        let aspectRatio =
          this.f.block_width == 1 ||
          this.f.block_height == 1 ||
          this.f.block_aspect_ratio
            ? 1 / this.f.block_aspect_ratio
            : `${this.f.block_width} / ${this.f.block_height} `;

        return {
          width: this.width,
          height: `100%`,
          maxWidth: '100%',
          position: 'relative',
          aspectRatio,
        };
      },
    },
    mounted() {
      GLightbox({
        selector: `[data-lightbox="${this.contentId}"]`,
        openEffect: 'zoom',
        closeEffect: 'none',
      });
    },
  };
</script>
