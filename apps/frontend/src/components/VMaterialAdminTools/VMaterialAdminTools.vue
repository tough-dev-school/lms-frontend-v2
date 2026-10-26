<script lang="ts" setup>
  import VCard from '../VCard/VCard.vue';
  import VButton from '../VButton/VButton.vue';
  import {
    materialsStatusRetrieve,
    materialsUpdateUpdate,
  } from '@/api/generated';
  import type { NotionCacheEntryStatus } from '@/api/generated';
  import { isApiError } from '@/api/client';
  import { router } from '@inertiajs/vue3';
  import { useIntervalFn } from '@vueuse/core';
  import { isBefore } from '@/utils/date';
  import { useDate } from '@/composables/useDate';
  import { computed, ref, watch } from 'vue';
  import VError from '@/components/VError/VError.vue';
  import type { FormError } from '@/types/error';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    materialId: string;
    // The server sends the status with the page, the panel only polls while an update runs
    initialStatus: NotionCacheEntryStatus | null;
  }>();

  const { t } = useI18n();
  const { formatDate } = useDate();

  const materialStatus = ref(props.initialStatus);
  const error = ref<FormError>(null);

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

  const refreshStatus = async () => {
    materialStatus.value = await materialsStatusRetrieve(props.materialId);
  };

  const updateMaterial = async () => {
    error.value = null;
    try {
      await materialsUpdateUpdate(props.materialId);
      await refreshStatus();
    } catch (caughtError) {
      if (!isApiError(caughtError)) throw caughtError;
      error.value = {
        non_field_errors: String(caughtError.data ?? caughtError.message),
      };
    }
  };

  useIntervalFn(() => {
    if (!inProgress.value) return;
    // A failed poll keeps the last known status, the next tick tries again
    refreshStatus().catch(() => {});
  }, 1000);

  // Fresh content is on the backend once the fetch completes, the page props have to catch up
  watch(inProgress, (value, previous) => {
    if (previous && !value) router.reload({ only: ['material'] });
  });
</script>

<template>
  <VCard
    class="flex flex-col gap-8 rounded-16 bg-white p-8 dark:bg-dark-black phone:p-24"
  >
    <p>{{ t('material.lastUpdate', { date: fetchStarted }) }}</p>
    <p>{{ t('material.upToDate', { date: fetchComplete }) }}</p>
    <VError :error="error" />
    <template #footer>
      <VButton @click="updateMaterial">
        <template v-if="inProgress">
          {{ t('material.updateInProgress') }}
        </template>
        <template v-else>{{ t('material.requestUpdate') }}</template>
      </VButton>
    </template>
  </VCard>
</template>
