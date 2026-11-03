<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';
  import { IconArrowLeft, IconArrowRight } from '@tabler/icons-vue';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    previousTo?: RouteLocationRaw;
    nextTo?: RouteLocationRaw;
    tableOfContentsTo?: RouteLocationRaw;
    homeworkQuestionSlug?: string;
  }>();

  const { t } = useI18n();
</script>

<template>
  <!-- Same muted style as breadcrumbs, so the footer doesn't compete with the material -->
  <nav class="flex items-center gap-16 text-sub text-gray">
    <!-- Equal flex-1 sides keep the middle links centered when a neighbour is missing -->
    <div class="flex flex-1">
      <RouterLink
        v-if="previousTo"
        :to="previousTo"
        :aria-label="t('material.previous')"
        class="flex items-center gap-4 transition-colors hover:text-black dark:hover:text-white"
      >
        <IconArrowLeft :size="16" />
        <span class="hidden phone:inline">{{ t('material.previous') }}</span>
      </RouterLink>
      <IconArrowLeft
        v-else
        :size="16"
        class="opacity-25"
      />
    </div>
    <div class="flex flex-wrap justify-center gap-x-16 gap-y-4">
      <RouterLink
        v-if="tableOfContentsTo"
        :to="tableOfContentsTo"
        class="transition-colors hover:text-black dark:hover:text-white"
      >
        {{ t('material.tableOfContents') }}
      </RouterLink>
      <RouterLink
        v-if="homeworkQuestionSlug"
        :to="{
          name: 'homework',
          params: { questionId: homeworkQuestionSlug },
        }"
        class="transition-colors hover:text-black dark:hover:text-white"
      >
        {{ t('material.toHomework') }}
      </RouterLink>
    </div>
    <div class="flex flex-1 justify-end">
      <RouterLink
        v-if="nextTo"
        :to="nextTo"
        :aria-label="t('material.next')"
        class="flex items-center gap-4 transition-colors hover:text-black dark:hover:text-white"
      >
        <span class="hidden phone:inline">{{ t('material.next') }}</span>
        <IconArrowRight :size="16" />
      </RouterLink>
      <IconArrowRight
        v-else
        :size="16"
        class="opacity-25"
      />
    </div>
  </nav>
</template>
