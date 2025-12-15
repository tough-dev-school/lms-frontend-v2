<script lang="ts" setup>
  import VCard from '../VCard/VCard.vue';
  import VButton from '../VButton/VButton.vue';
  import {
    materialsRetrieveQueryKey,
    useMaterialsStatusRetrieve,
    materialsStatusRetrieveQueryKey,
    useMaterialsUpdateUpdate,
  } from '@/api';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useIntervalFn } from '@vueuse/core';
  import { DATE_TIME_SECONDS_FORMAT, formatDate, isBefore } from '@/utils/date';
  import { computed } from 'vue';
  import VError from '@/components/VError/VError.vue';

  const props = defineProps<{
    materialId: string;
  }>();

  const queryClient = useQueryClient();

  const { mutateAsync: updateMaterial, error } = useMaterialsUpdateUpdate({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
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
      ? formatDate(
          materialStatus.value.fetch_started,
          DATE_TIME_SECONDS_FORMAT,
          true,
        )
      : '-';
  });

  const fetchComplete = computed(() => {
    return materialStatus.value?.fetch_complete
      ? formatDate(
          materialStatus.value.fetch_complete,
          DATE_TIME_SECONDS_FORMAT,
          true,
        )
      : '-';
  });

  useIntervalFn(() => {
    if (!inProgress.value) return;

    queryClient.invalidateQueries({
      queryKey: materialsStatusRetrieveQueryKey(props.materialId),
    });
  }, 1000);
</script>

<template>
  <VCard
    class="flex flex-col gap-8 rounded-16 bg-white p-8 dark:bg-dark-black phone:p-24"
  >
    <p>Последнее обновление: {{ fetchStarted }}</p>
    <p>Материал актуален: {{ fetchComplete }}</p>
    <VError :error="error" />
    <template #footer>
      <VButton @click="() => updateMaterial({ page_id: props.materialId })">
        <template v-if="inProgress">Обновление в процессе</template>
        <template v-else>Запросить обновление</template>
      </VButton>
    </template>
  </VCard>
</template>
