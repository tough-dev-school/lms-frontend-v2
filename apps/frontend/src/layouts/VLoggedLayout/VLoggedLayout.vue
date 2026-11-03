<script lang="ts" setup>
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import { useTitle } from '@vueuse/core';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const props = withDefaults(
    defineProps<{
      title?: string;
      showTitle?: boolean;
      breadcrumbs?: Breadcrumb[];
    }>(),
    {
      title: undefined,
      showTitle: true,
      breadcrumbs: undefined,
    },
  );

  const { t } = useI18n();

  const formattedTitle = computed(() => {
    return [props.title, t('common.schoolName')].filter(Boolean).join(' | ');
  });

  useTitle(formattedTitle);
</script>

<template>
  <VPublicLayout>
    <template #header>
      <VProfileMenu data-testid="profile" />
    </template>
    <div
      v-if="title || breadcrumbs || $slots.pill"
      class="flex flex-col gap-32"
    >
      <div
        v-if="breadcrumbs"
        class="flex items-start justify-between gap-16"
      >
        <VBreadcrumbs :items="breadcrumbs" />
        <slot name="breadcrumbs-end" />
      </div>
      <slot name="pill" />
      <VHeading
        v-if="title && showTitle"
        tag="h1"
      >
        {{ title }}
      </VHeading>
    </div>
    <slot />
  </VPublicLayout>
</template>
