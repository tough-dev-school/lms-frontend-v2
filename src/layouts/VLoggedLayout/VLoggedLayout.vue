<script lang="ts" setup>
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VBreadcrumbs, {
    type Breadcrumb,
  } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';

  withDefaults(
    defineProps<{
      isLoading?: boolean;
      title?: string;
      breadcrumbs?: Breadcrumb[];
    }>(),
    {
      isLoading: false,
      title: undefined,
      breadcrumbs: undefined,
    },
  );
</script>

<template>
  <VPublicLayout :is-loading="isLoading">
    <template #header>
      <VProfileMenu data-testid="profile" />
    </template>
    <div
      v-if="title || breadcrumbs || $slots.pill"
      class="flex flex-col gap-32">
      <VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
      <slot name="pill" />
      <VHeading v-if="title" tag="h1">{{ title }}</VHeading>
    </div>
    <slot />
  </VPublicLayout>
</template>
