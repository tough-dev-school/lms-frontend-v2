<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VCard from '@/components/VCard.vue';
  import type { Diploma } from '@/types/diplomas';
  import VCertificate from './VCertificate.vue';

  export interface Props {
    course: string;
    certificates: Diploma[];
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
