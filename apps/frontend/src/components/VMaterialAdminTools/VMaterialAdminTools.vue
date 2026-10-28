<script lang="ts" setup>
  import VCard from '../VCard/VCard.vue';
  import VButton from '../VButton/VButton.vue';
  import {
    materialsRetrieveQueryKey,
    useMaterialsStatusRetrieve,
    materialsStatusRetrieveQueryKey,
    useMaterialsUpdateUpdate,
  } from '@/api/generated';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useIntervalFn } from '@vueuse/core';
  import { formatDate, isBefore } from '@/utils/date';
  import { computed } from 'vue';
  import VError from '@/components/VError/VError.vue';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    materialId: string;
  }>();

  const queryClient = useQueryClient();
  const { t } = useI18n();

  const { mutateAsync: updateMaterial, error } = useMaterialsUpdateUpdate({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: materialsRetrieveQueryKey(props.materialId),
        });
      },
    },
  });

  const { data: materialStatus } = useMaterialsStatusRetrieve(
    () => props.materialId,
  );

  const inProgress = computed(() => {
    if (!materialStatus.value?.fetch_started) {
      return false;
    }

    if (!materialStatus.value?.fetch_complete) {
      return true;
    }

    return isBefore(
      materialStatus.value.fetch_started,
      materialStatus.value.fetch_complete,
    );
  });

  const fetchStarted = computed(() => {
    return materialStatus.value?.fetch_started
      ? formatDate(materialStatus.value.fetch_started, 'dateTimeSeconds', true)
      : '-';
  });

  const fetchComplete = computed(() => {
    return materialStatus.value?.fetch_complete
      ? formatDate(materialStatus.value.fetch_complete, 'dateTimeSeconds', true)
      : '-';
  });

  useIntervalFn(() => {
    if (!inProgress.value) return;

    void queryClient.invalidateQueries({
      queryKey: materialsStatusRetrieveQueryKey(props.materialId),
    });
  }, 1000);
</script>

<template>
  <VCard
    class="flex flex-col gap-8 rounded-16 bg-white p-8 dark:bg-dark-black phone:p-24"
  >
    <p>{{ t('material.lastUpdate', { date: fetchStarted }) }}</p>
    <p>{{ t('material.upToDate', { date: fetchComplete }) }}</p>
    <VError :error="error" />
    <template #footer>
      <VButton @click="() => updateMaterial({ page_id: props.materialId })">
        <template v-if="inProgress">
          {{ t('material.updateInProgress') }}
        </template>
        <template v-else>{{ t('material.requestUpdate') }}</template>
      </VButton>
    </template>
  </VCard>
</template>
