<script lang="ts" setup>
  import useDiplomas from '@/stores/diplomas';
  import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
  import { computed } from 'vue';
  import { groupBy } from 'lodash-es';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';

  const diplomas = useDiplomas();

  const groupedDiplomas = computed(() => {
    const gorups = groupBy(diplomas.items, (diploma) => diploma.course.name);

    return Object.keys(gorups).map((key) => ({
      course: key,
      certificates: gorups[key],
    }));
  });
</script>

<template>
  <VLoggedLayout title="Мои сертификаты">
    <VCertificateCard
      v-for="group in groupedDiplomas"
      :key="group.course"
      data-testid="certificate"
      :certificates="group.certificates"
      :course="group.course" />
    <li
      v-if="groupedDiplomas.length === 0"
      data-testid="empty"
      class="flex h-128 flex-grow items-center justify-center rounded border border-dashed border-gray text-center text-gray">
      Нет сертификатов
    </li>
  </VLoggedLayout>
</template>
