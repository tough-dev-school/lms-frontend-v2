<script setup lang="ts">
  import VDetails from '@/components/VDetails/VDetails.vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    guide: string;
  }>();

  const { t } = useI18n();
</script>

<template>
  <VDetails tag="details">
    <template #title> {{ t('feedbackGuide.title') }} </template>
    <div
      class="prose mt-8 prose-h3:mt-16 prose-h3:text-base"
      v-html="props.guide"
    />
  </VDetails>
</template>
