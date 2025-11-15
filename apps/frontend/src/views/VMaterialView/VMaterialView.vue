<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import getNotionTitle from '@/utils/getNotionTitle';
  import VNotionRenderer from '@/components/VNotionRenderer/VNotionRenderer.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import { useMaterialQuery } from '@/query';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { SUPPORT_EMAIL, SUPPORT_CHAT_URL } from '@/constants';

  const props = defineProps<{
    materialId: string;
  }>();

  const router = useRouter();

  const { data: materialData, isLoading } = useMaterialQuery(
    () => props.materialId,
  );

  const material = computed(() => {
    if (!materialData.value) return undefined;
    return materialData.value.content;
  });

  const notionTitle = computed(() => {
    if (material.value) {
      return getNotionTitle(props.materialId, material.value);
    }
    return undefined;
  });

  const breadcrumbs = computed(() => {
    const result: Breadcrumb[] = [
      { name: 'Мои курсы', to: { name: 'courses' } },
    ];

    if (!materialData.value) return undefined;

    if (materialData.value.breadcrumbs.course) {
      result.push({
        name: materialData.value.breadcrumbs.course.name,
        to: {
          name: 'course',
          params: {
            courseId: materialData.value.breadcrumbs.course.id,
          },
        },
      });
    } else {
      return undefined;
    }

    if (materialData.value.breadcrumbs.module) {
      result.push({
        name: materialData.value.breadcrumbs.module.name,
        to: {
          name: 'module',
          params: {
            courseId: materialData.value.breadcrumbs.course.id,
            moduleId: materialData.value.breadcrumbs.module.id,
          },
        },
      });
    } else {
      return undefined;
    }

    result.push({
      name: notionTitle.value ?? '',
      to: {
        name: 'materials',
        params: {
          materialId: props.materialId,
        },
      },
    });

    return result;
  });
</script>

<template>
  <template v-if="!isLoading">
    <VLoggedLayout
      :title="notionTitle"
      :show-title="false"
      :breadcrumbs="breadcrumbs"
    >
      <template v-if="material">
        <VCard
          class="rounded-16 bg-white p-8 pt-32 shadow dark:bg-dark-black phone:p-24"
        >
          <VNotionRenderer
            :material-id="materialId"
            :block-map="material"
          />
        </VCard>
      </template>
      <div
        v-else-if="!material"
        class="center flex max-w-[400px] flex-col text-center"
      >
        <p>Материал не найден :(</p>
        <p>
          Если кажется что здесь какая-то ошибка напишите в поддержку
          <a
            class="link"
            :href="SUPPORT_CHAT_URL"
          >
            в чат в углу экрана
          </a>
          или на
          <a
            class="link"
            href="mailto:{{ SUPPORT_EMAIL }}"
          >
            {{ SUPPORT_EMAIL }}
          </a>
        </p>
        <VButton
          appearance="link"
          @click="router.push({ name: 'courses' })"
        >
          На главную
        </VButton>
      </div>
    </VLoggedLayout>
  </template>
  <VLoadingView v-else />
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
    @apply items-start border-0;
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
