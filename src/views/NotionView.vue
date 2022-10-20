<script lang="ts" setup>
  // @ts-ignore
  import { NotionRenderer } from 'vue3-notion';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import type { MaterialContentBlocks } from '@/types/materials';

  import Preloader from '../components/Preloader.vue';
  import { getMaterialById } from '@/api/materials';

  const route = useRoute();
  const blocks = ref<MaterialContentBlocks | undefined>(undefined);

  onMounted(async () => {
    const newBlocks = await getMaterialById(String(route.params.id));

    blocks.value = newBlocks;
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

<style>
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
