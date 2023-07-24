<script lang="ts" setup>
  import { VCertificateCard } from '@/components/VCertificateCard';
  import { VHeading } from '@/components/VHeading';
  import useDiplomas from '@/stores/diplomas';
  import groupBy from 'lodash/groupBy';
  import { computed } from 'vue';

  const diplomas = useDiplomas();

  const groupedDiplomas = computed(() => {
    const gorups = groupBy(diplomas.items, (diploma) => diploma.course.name);

    return Object.keys(gorups).map((key) => ({
      certificates: gorups[key],
      course: key,
    }));
  });
</script>

<template>
  <main class="grid gap-24">
    <VHeading tag="h1">Мои сертификаты</VHeading>
    <div class="grid gap-24">
      <VCertificateCard
        data-testid="certificate"
        :certificates="group.certificates"
        :course="group.course"
        v-for="group in groupedDiplomas"
        :key="group.course" />
      <li
        data-testid="empty"
        v-if="groupedDiplomas.length === 0"
        class="flex h-128 flex-grow items-center justify-center rounded border border-dashed border-gray text-center text-gray">
        Нет сертификатов
      </li>
    </div>
  </main>
</template>
