<script lang="ts" setup>
  import type { Diploma } from '@/types/diplomas';

  import { VCard } from '@/components/VCard';
  import { VCertificate } from '@/components/VCertificate';
  import { VHeading } from '@/components/VHeading';

  export interface Props {
    certificates: Diploma[];
    course: string;
  }

  defineProps<Props>();
</script>

<template>
  <VCard tag="section" class="grid gap-16">
    <VHeading tag="h2" data-testid="name">Курс «{{ course }}»</VHeading>
    <ul class="grid gap-32 phone:grid-cols-2">
      <VCertificate
        v-for="certificate in certificates"
        data-testid="certificate"
        :certificate="certificate"
        :key="certificate.slug" />
    </ul>
  </VCard>
</template>
