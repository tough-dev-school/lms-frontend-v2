<script lang="ts" setup>
  // @ts-ignore
  import { NotionRenderer } from '@/../../vue-notion';
  import { useRoute, useRouter } from 'vue-router';
  import { watch, computed } from 'vue';

  import 'prismjs';
  import 'prismjs/themes/prism.css';
  import 'prismjs/components/prism-typescript.js';
  import 'prismjs/components/prism-ruby.js';
  import 'prismjs/components/prism-python.js';
  import 'prismjs/components/prism-bash.js';
  import 'prismjs/components/prism-c.js';
  import 'prismjs/components/prism-cpp.js';

  import VCard from '@/components/VCard/VCard.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import useMaterials from '@/stores/materials';
  import { useTitle } from '@vueuse/core';
  import getNotionTitle from '@/utils/getNotionTitle';
  import { useChatra } from '@/hooks/useChatra';

  const router = useRouter();
  const materials = useMaterials();
  const title = useTitle();
  const route = useRoute();

  watch(
    () => route.params.id,
    async () => {
      if (materials.material) {
        const materialId = String(route.params.id);
        const notionTitle = getNotionTitle(materialId, materials.material);
        if (notionTitle) title.value = notionTitle;
      }
    },
    { immediate: true },
  );

  const mapPageUrl = (id: string) => `/materials/${id}`;
  const { chatra } = useChatra();

  const rendererProps = computed(() => {
    return {
      blockMap: materials.material,
      mapPageUrl,
      fullPage: true,
      pageLinkOptions: {
        component: 'RouterLink',
        href: 'to',
      },
    };
  });
</script>

<template>
  <VCard v-if="materials.material" class="pt-32">
    <NotionRenderer v-bind="rendererProps" prism />
  </VCard>
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
  @import '@/../../vue-notion/styles.css';

  .notion {
    @apply text-black dark:text-white;
  }

  .notion-page-cover {
    margin: 0;
    width: 100%;
    height: auto;
    @apply aspect-[5/2];
  }

  .notion-bookmark,
  .notion-code {
    @apply dark:bg-dark-black;
  }

  .notion-table-of-contents-item {
    @apply underline dark:text-white dark:decoration-white;
  }

  .notion-page-link {
    @apply dark:text-white dark:text-opacity-70;
  }

  .notion-image-caption {
    color: inherit;
  }

  .notion-bookmark div {
    @apply dark:text-white;
  }

  .notion-callout {
    @apply border-0 items-start;
  }

  .notion-simple-table-data {
    position: initial;
  }

  .notion-red_background,
  .notion-pink_background,
  .notion-blue_background,
  .notion-purple_background,
  .notion-teal_background,
  .notion-yellow_background,
  .notion-orange_background,
  .notion-brown_background,
  .notion-gray_background,
  .notion-red_background_co,
  .notion-pink_background_co,
  .notion-blue_background_co,
  .notion-purple_background_co,
  .notion-teal_background_co,
  .notion-yellow_background_co,
  .notion-orange_background_co,
  .notion-brown_background_co,
  .notion-gray_background_co {
    @apply dark:text-black;
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

  .notion-hr {
    height: 1px;
    background-color: var(--fg-color-0);
    border: none;
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
