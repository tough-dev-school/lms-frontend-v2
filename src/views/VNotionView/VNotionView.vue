<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { watch } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import { useTitle } from '@vueuse/core';
  import getNotionTitle from '@/utils/getNotionTitle';
  import { useChatra } from '@/hooks/useChatra';
  import VNotionRenderer from '@/components/VNotionRenderer/VNotionRenderer.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useRouteParams } from '@vueuse/router';
  import { useMaterialQuery } from '@/query';

  const router = useRouter();
  const materialId = useRouteParams<string>('materialId');
  const title = useTitle();

  const { data: material, isLoading, isSuccess } = useMaterialQuery(materialId);

  watch(
    () => isSuccess.value,
    () => {
      console.log(material.value);
      if (isSuccess.value && material.value) {
        const notionTitle = getNotionTitle(materialId.value, material.value);
        if (notionTitle) title.value = notionTitle;
      }
    },
  );

  watch(
    () => material.value,
    () => {
      console.log(material.value);
    },
    { immediate: true },
  );

  const { chatra } = useChatra();
</script>

<template>
  <VLoggedLayout :is-loading="isLoading">
    <template v-if="material">
      <VCard
        class="pt-32 bg-white dark:bg-dark-black p-8 phone:p-24 rounded-16 shadow">
        <VNotionRenderer :block-map="material" />
      </VCard>
    </template>
    <div
      v-else-if="!material"
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
  </VLoggedLayout>
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
