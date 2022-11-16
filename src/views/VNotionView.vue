<script lang="ts" setup>
  // @ts-ignore
  import { NotionRenderer } from 'vue3-notion';
  import { useRoute } from 'vue-router';
  import { onMounted, watch } from 'vue';
  import VCard from '@/components/VCard.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import useMaterials from '@/stores/materials';
  import { storeToRefs } from 'pinia';

  const route = useRoute();
  const materials = useMaterials();
  const { material } = storeToRefs(materials);

  watch(route, async () => {
    await materials.getData(String(route.params.id));
  });

  onMounted(async () => {
    await materials.getData(String(route.params.id));
  });

  const mapPageUrl = (id: string) => `/materials/${id}`;
</script>

<template>
  <VCard class="pt-32" v-if="material">
    <NotionRenderer :blockMap="material" :map-page-url="mapPageUrl" fullPage />
  </VCard>
  <VPreloader v-else />
</template>

<style>
  @import 'vue3-notion/dist/style.css';

  .notion-page-cover {
    width: var(--notion-max-width);
    margin: 0 auto;
  }

  .notion-page,
  .notion-page-cover {
    @apply p-0;
  }

  .notion-page-cover,
  .notion-image-inset,
  .notion-callout {
    @apply rounded-[12px];
  }

  .notion {
    @apply font-body;
  }

  .notion-title,
  .notion-h1 {
    @apply text-h1;
  }

  .notion-h2 {
    @apply text-h2;
  }

  .notion-h3 {
    @apply text-h3;
  }

  .notion-link {
    @apply border-blue text-blue opacity-100 hover:border-red hover:text-red;
  }
</style>
