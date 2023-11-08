<script lang="ts" setup>
  import useDiplomas from '@/stores/diplomas';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
  import { computed } from 'vue';
  import { groupBy } from 'lodash-es';

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
  <main class="grid gap-24">
    <VHeading tag="h1">Мои сертификаты</VHeading>
    <div class="grid gap-24">
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
    </div>
  </main>
</template>
