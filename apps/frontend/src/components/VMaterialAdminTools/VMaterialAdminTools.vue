<script lang="ts" setup>
  import type { User } from '@/api/generated/generated-api';
  import VCard from '../VCard/VCard.vue';
  import VButton from '../VButton/VButton.vue';
  import {
    useUpdateMaterialMutation,
    useMaterialStatusQuery,
    materialsKeys,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useIntervalFn } from '@vueuse/core';
  import { isBefore } from '@/utils/date';
  import { computed } from 'vue';

  const props = defineProps<{
    user?: User;
    materialId: string;
  }>();

  const queryClient = useQueryClient();

  const { mutateAsync: updateMaterial } =
    useUpdateMaterialMutation(queryClient);

  const { data: materialStatus } = useMaterialStatusQuery(
    () => props.materialId,
  );

  const inProgress = computed(() => {
    return isBefore(
      materialStatus.value?.fetch_started,
      materialStatus.value?.fetch_complete,
    );
  });

  useIntervalFn(() => {
    queryClient.invalidateQueries({
      queryKey: materialsKeys.status(props.materialId),
    });
  }, 1000);
</script>

<template>
  <VCard
    v-if="user?.is_staff"
    class="flex flex-col gap-8 rounded-16 bg-white p-8 dark:bg-dark-black phone:p-24"
  >
    <p>Последнее обновление запущено {{ materialStatus?.fetch_started }}</p>
    <p>Материал актуален на {{ materialStatus?.fetch_complete }}</p>
    <template #footer>
      <VButton @click="() => updateMaterial(props.materialId)">
        <template v-if="inProgress">Обновление в процессе</template>
        <template v-else>Запросить обновление</template>
      </VButton>
    </template>
  </VCard>
</template>
