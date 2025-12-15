<script lang="ts" setup>
  import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
  import { computed } from 'vue';
  import { groupBy } from 'lodash-es';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useDiplomasList } from '@/api';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const { data: diplomasData, isLoading } = useDiplomasList({ page_size: 100 });

  const diplomas = computed(() => diplomasData.value?.results);

  const groupedDiplomas = computed(() => {
    const groups = groupBy(
      diplomas.value,
      (diploma) => diploma.course.product_name,
    );

    return Object.keys(groups).map((key) => ({
      course: key,
      certificates: groups[key],
    }));
  });
</script>

<template>
  <VLoggedLayout
    v-if="!isLoading"
    title="Мои сертификаты"
  >
    <VCertificateCard
      v-for="group in groupedDiplomas"
      :key="group.course"
      data-testid="certificate"
      :certificates="group.certificates"
      :course="group.course"
    />
    <li
      v-if="groupedDiplomas.length === 0"
      data-testid="empty"
      class="flex h-128 flex-grow items-center justify-center rounded border border-dashed border-gray text-center text-gray"
    >
      Нет сертификатов
    </li>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
