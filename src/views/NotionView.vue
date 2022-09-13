<template>
  <div class="notion-page">
    <NotionRenderer
      v-if="isLoaded"
      class="notion-page__data"
      :block-map="blocks"
      :map-page-url="mapPageUrl"
      :page-link-options="pageLinkOptions"
      full-page />
    <AppSpinner v-else class="notion-page__spinner" />
  </div>
</template>
<script>
import { NotionRenderer } from 'vue-notion';
import AppSpinner from '@/components/AppSpinner';

import axios from '@/api/backend.js';

export default {
  components: {
    NotionRenderer,
    AppSpinner,
  },
  data: () => ({
    blockMap: null,
    isLoaded: false,
    pageLinkOptions: {
      component: 'router-link',
      href: 'to',
    },
  }),
  watch: {
    async $route(to) {
      this.fetchNotionBlocks(to.params.page);
    },
  },
  async created() {
    this.fetchNotionBlocks(this.$route.params.page);
  },

  methods: {
    mapPageUrl(pageId) {
      return `/materials/${pageId}/`;
    },
    async fetchNotionBlocks(pageId) {
      this.isLoaded = false;
      const response = await axios.get(`/api/v2/notion/materials/${pageId}/`);
      this.blocks = response.data;
      this.isLoaded = true;
    },
  },
};
</script>

<style src="vue-notion/src/styles.css" />
<style lang="postcss">
.notion {
  .notion-code {
    max-width: 95vw;
  }
}
</style>

<style lang="postcss" scoped>
.notion-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  &__data {
    margin: auto;
  }

  &__spinner {
    position: relative;
    top: -5rem;
  }
}
</style>

<style lang="postcss">
.notion-page {
  .notion-text {
    padding: 8px 2px;
  }
}
</style>
