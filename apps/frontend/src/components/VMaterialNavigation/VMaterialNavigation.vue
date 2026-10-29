<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';
  import VButton from '../VButton/VButton.vue';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    previousMaterialId?: string;
    nextMaterialId?: string;
    tableOfContentsTo?: RouteLocationRaw;
    homeworkQuestionSlug?: string;
  }>();

  const { t } = useI18n();
</script>

<template>
  <nav class="flex flex-col items-center gap-16">
    <div class="flex w-full items-center justify-center gap-16">
      <RouterLink
        v-if="previousMaterialId"
        :to="{
          name: 'materials',
          params: { materialId: previousMaterialId },
        }"
        :aria-label="t('material.previous')"
        class="shrink-0"
      >
        <VButton
          appearance="secondary"
          size="inline"
          class="aspect-square h-module"
        >
          ←
        </VButton>
      </RouterLink>
      <!-- Keeps table of contents button centered when there is no neighbour -->
      <div
        v-else
        class="aspect-square h-module shrink-0"
      />
      <RouterLink
        v-if="tableOfContentsTo"
        :to="tableOfContentsTo"
        class="min-w-0 flex-1 phone:min-w-[280px] phone:flex-none"
      >
        <VButton
          size="inline"
          class="h-module w-full p-module"
        >
          {{ t('material.tableOfContents') }}
        </VButton>
      </RouterLink>
      <RouterLink
        v-if="nextMaterialId"
        :to="{
          name: 'materials',
          params: { materialId: nextMaterialId },
        }"
        :aria-label="t('material.next')"
        class="shrink-0"
      >
        <VButton
          appearance="secondary"
          size="inline"
          class="aspect-square h-module"
        >
          →
        </VButton>
      </RouterLink>
      <div
        v-else
        class="aspect-square h-module shrink-0"
      />
    </div>
    <RouterLink
      v-if="homeworkQuestionSlug"
      :to="{
        name: 'homework',
        params: { questionId: homeworkQuestionSlug },
      }"
    >
      <VButton appearance="secondary">
        {{ t('material.toHomework') }}
      </VButton>
    </RouterLink>
  </nav>
</template>
