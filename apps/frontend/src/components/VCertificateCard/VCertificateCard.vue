<script lang="ts" setup>
  import VCard from '@/components/VCard/VCard.vue';
  import type { Diploma } from '@/api/generated';
  import VCertificate from '@/components/VCertificate/VCertificate.vue';
  import { useI18n } from 'vue-i18n';

  export interface Props {
    course: string;
    certificates: Diploma[];
  }

  defineProps<Props>();

  const { t } = useI18n();
</script>

<template>
  <VCard
    tag="section"
    data-testid="container"
    class="grid gap-16"
    :title="t('certificates.course', { course })"
  >
    <ul class="grid gap-32 phone:grid-cols-2">
      <VCertificate
        v-for="certificate in certificates"
        :key="certificate.slug"
        data-testid="certificate"
        :certificate="certificate"
      />
    </ul>
  </VCard>
</template>
