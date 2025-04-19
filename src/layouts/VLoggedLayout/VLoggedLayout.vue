<script lang="ts" setup>
  import VPublicLayout from '@/layouts/VPublicLayout/VPublicLayout.vue';
  import VBreadcrumbs, {
    type Breadcrumb,
  } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';

  withDefaults(defineProps<{ title?: string; breadcrumbs?: Breadcrumb[] }>(), {
    title: undefined,
    breadcrumbs: undefined,
  });
</script>

<template>
  <VPublicLayout>
    <template #header>
      <VProfileMenu data-testid="profile" />
    </template>
    <div v-if="title || breadcrumbs">
      <VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
      <VHeading v-if="title" tag="h1">{{ title }}</VHeading>
    </div>
    <slot />
  </VPublicLayout>
</template>
