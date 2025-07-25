<script lang="ts" setup>
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VBreadcrumbs from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
  import { useTitle } from '@vueuse/core';
  import { computed } from 'vue';

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

  const formattedTitle = computed(() => {
    return [props.title, 'Школа Сильных Программистов']
      .filter(Boolean)
      .join(' | ');
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
      class="flex flex-col gap-32">
      <VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
      <slot name="pill" />
      <VHeading v-if="title && showTitle" tag="h1">{{ title }}</VHeading>
    </div>
    <slot />
  </VPublicLayout>
</template>
