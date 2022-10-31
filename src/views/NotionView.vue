<script lang="ts" setup>
  // @ts-ignore
  import { NotionRenderer } from 'vue3-notion';
  import { useRoute } from 'vue-router';
  import { onMounted, onUpdated, ref, watch } from 'vue';
  import type { MaterialContentBlocks } from '@/types/materials';

  import Preloader from '../components/Preloader.vue';
  import { getMaterialById } from '@/api/materials';

  const route = useRoute();
  const blocks = ref<MaterialContentBlocks | undefined>(undefined);

  const update = async () => {
    blocks.value = undefined;
    blocks.value = await getMaterialById(String(route.params.id));
  };

  watch(route, async () => {
    await update();
  });

  onMounted(async () => {
    await update();
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
