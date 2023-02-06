<script lang="ts" setup>
  // @ts-ignore
  import { NotionRenderer } from 'vue3-notion';
  import { useRoute, useRouter } from 'vue-router';
  import { watch, ref } from 'vue';
  import VCard from '@/components/VCard.vue';
  import VButton from '@/components/VButton.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import useMaterials from '@/stores/materials';

  const route = useRoute();
  const router = useRouter();
  const materials = useMaterials();

  const getData = async () => {
    isLoaded.value = false;
    await materials.getData(String(route.params.id));
    isLoaded.value = true;
  };

  const isLoaded = ref(false);

  watch(
    route,
    async () => {
      await getData();
    },
    { immediate: true },
  );

  const mapPageUrl = (id: string) => `/materials/${id}`;
</script>

<template>
  <VCard class="pt-32" v-if="isLoaded && materials.material">
    <NotionRenderer
      :blockMap="materials.material"
      :map-page-url="mapPageUrl"
      fullPage />
  </VCard>
  <div
    v-else-if="isLoaded && !materials.material"
    class="center flex max-w-[400px] flex-col text-center">
    <p>Материал не найден :(</p>
    <p>
      Если кажется что здесь какая-то ошибка напишите в чат в углу экрана или на
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
  <VPreloader v-else />
</template>

<style>
  @import 'vue3-notion/dist/style.css';

  .notion {
    @apply text-black dark:text-white;
  }

  .notion-gray_background,
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
    @apply dark:text-white;
  }

  .notion-bookmark div {
    @apply dark:text-white;
  }

  .notion-callout {
    @apply dark:border-0;
  }

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

  .notion-simple-table-wrapper {
    overflow: scroll;
    max-width: 100%;
    width: 100%;
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
</style>
