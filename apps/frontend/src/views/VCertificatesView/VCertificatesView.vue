<script lang="ts" setup>
  import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
  import { computed } from 'vue';
  import { groupBy } from 'es-toolkit/compat';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Diploma } from '@/api/generated';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    diplomas: Diploma[];
  }>();

  const { t } = useI18n();

  const groupedDiplomas = computed(() => {
    const groups = groupBy(
      props.diplomas,
      (diploma) => diploma.course.product_name,
    );

    return Object.keys(groups).map((key) => ({
      course: key,
      certificates: groups[key],
    }));
  });
</script>

<template>
  <VLoggedLayout :title="t('certificates.title')">
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
      {{ t('certificates.empty') }}
    </li>
  </VLoggedLayout>
</template>
