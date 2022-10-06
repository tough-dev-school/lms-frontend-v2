<script lang="ts" setup>
  import { NotionRenderer } from 'vue3-notion';
  import axios from '@/axios';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import Preloader from '../components/Preloader.vue';

  const route = useRoute();
  const blocks = ref('');

  onMounted(async () => {
    const response = await axios.get(
      `/api/v2/notion/materials/${route.params.id}/`,
    );

    blocks.value = response.data;
  });

  const mapPageUrl = (id: string) => `/materials/${id}`;
</script>

<template>
  <div>
    <NotionRenderer
      v-if="blocks"
      :blockMap="blocks"
      :map-page-url="mapPageUrl"
      fullPage />
    <Preloader v-else />
  </div>
</template>

<style lang="scss">
  @import 'vue3-notion/dist/style.css';

  .notion-page-cover {
    padding-left: calc(min(12px, 8vw));
    padding-right: calc(min(12px, 8vw));
    width: var(--notion-max-width);
    margin: 0 auto;
  }

  .notion {
    @apply font-body;
  }
</style>
