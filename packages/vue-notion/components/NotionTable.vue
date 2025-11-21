<template>
  <div>
    <div
      class="notion-simple-table-container"
      :class="{ 'is-at-end': isAtEnd }"
    >
      <div
        ref="wrapper"
        class="notion-simple-table-wrapper"
        @scroll="handleScroll"
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

<script>
  import { Blockable } from '../lib/blockable';

  export default {
    extends: Blockable,
    data() {
      return {
        isScrollable: false,
        isAtEnd: false,
      };
    },
    mounted() {
      this.checkScrollable();
      window.addEventListener('resize', this.checkScrollable);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkScrollable);
    },
    methods: {
      checkScrollable() {
        const wrapper = this.$refs.wrapper;
        if (wrapper) {
          this.isScrollable = wrapper.scrollWidth > wrapper.clientWidth;
          this.checkScrollPosition();
        }
      },
      handleScroll() {
        this.checkScrollPosition();
      },
      checkScrollPosition() {
        const wrapper = this.$refs.wrapper;
        if (wrapper) {
          const scrollLeft = wrapper.scrollLeft;
          const scrollWidth = wrapper.scrollWidth;
          const clientWidth = wrapper.clientWidth;
          this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
        }
      },
    },
  };
</script>

<style scoped>
  .notion-simple-table-container {
    position: relative;
  }

  .notion-simple-table-container::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 64px;
    background: linear-gradient(to right, transparent, #fff);
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
  }

  .notion-simple-table-container.is-at-end::after {
    opacity: 0;
  }

  .scroll-tip {
    text-align: right;
    font-size: 0.875rem;
    color: #999;
    padding: 0.5rem;
  }
</style>
