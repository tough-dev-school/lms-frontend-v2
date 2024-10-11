<script lang="ts">
  export interface VNotionView {
    forceNew?: boolean;
  }
</script>

<script lang="ts" setup>
  import { useRoute, useRouter } from 'vue-router';
  import { ref, watch } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import useMaterials from '@/stores/materials';
  import { useTitle } from '@vueuse/core';
  import getNotionTitle from '@/utils/getNotionTitle';
  import { useChatra } from '@/hooks/useChatra';
  import VNotionRenderer from '@/components/VNotionRenderer/VNotionRenderer.vue';

  const router = useRouter();
  const materials = useMaterials();
  const title = useTitle();
  const route = useRoute();
  const loadedWithNewRoute = ref(false);

  withDefaults(defineProps<VNotionView>(), { forceNew: true });

  watch(
    () => route.params.id,
    async () => {
      if (materials.material) {
        const materialId = String(route.params.id);
        const notionTitle = getNotionTitle(materialId, materials.material);
        if (notionTitle) title.value = notionTitle;
      }
      loadedWithNewRoute.value = true;
    },
    { immediate: true },
  );

  const { chatra } = useChatra();
</script>

<template>
  <template v-if="materials.material">
    <VCard v-if="loadedWithNewRoute" class="pt-32">
      <VNotionRenderer :block-map="materials.material" />
    </VCard>
  </template>
  <div
    v-else-if="!materials.material"
    class="center flex max-w-[400px] flex-col text-center">
    <p>Материал не найден :(</p>
    <p>
      Если кажется что здесь какая-то ошибка напишите
      <button class="link" @click="chatra('openChat', true)">
        в чат в углу экрана
      </button>
      или на
      <a
        class="link"
        href="mailto:
support@tough-dev.school">
        support@tough-dev.school</a
      >
    </p>
    <VButton appearance="link" @click="router.push({ name: 'home' })"
      >На главную</VButton
    >
  </div>
</template>

<style>
  .notion-page-cover {
    margin: 0;
    width: 100%;
    height: auto;
    @apply aspect-[5/2];
  }

  .notion-image-caption {
    color: inherit;
  }

  .notion-callout {
    @apply border-0 items-start;
  }

  .notion-simple-table-data {
    position: initial;
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

  .notion-simple-table-wrapper {
    overflow: scroll;
    max-width: 100%;
    width: 100%;
  }

  .notion-simple-table-header {
    background-color: transparent;
  }

  .notion-simple-table {
    width: 100%;
  }

  .notion-toggle {
    width: 100%;
  }

  img.notion-page-icon {
    max-width: 100%;
    max-height: 100%;
    width: clamp(72px, 10vw, 96px);
    height: clamp(72px, 10vw, 96px);
  }

  .notion-page-icon-offset img {
    margin-top: -50%;
  }
</style>
