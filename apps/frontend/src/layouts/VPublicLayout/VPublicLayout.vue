<script lang="ts" setup>
  import { Head } from '@inertiajs/vue3';
  import { useI18n } from 'vue-i18n';
  import VHeader from '@/components/VHeader/VHeader.vue';
  import VBaseLayout from '@/layouts/VBaseLayout/VBaseLayout.vue';

  // Logged pages put their own name in front of the school name
  defineProps<{ title?: string }>();

  const { t } = useI18n();
</script>

<template>
  <Head :title="title ?? t('common.schoolName')" />
  <VBaseLayout>
    <VHeader>
      <slot name="header" />
    </VHeader>
    <div class="flex flex-col gap-48">
      <slot />
    </div>
  </VBaseLayout>
</template>
