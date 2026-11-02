<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';
  import { IconArrowLeft, IconArrowRight } from '@tabler/icons-vue';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    previousTo?: RouteLocationRaw;
    nextTo?: RouteLocationRaw;
  }>();

  const { t } = useI18n();
</script>

<template>
  <nav class="flex shrink-0 items-center gap-8 text-gray">
    <RouterLink
      v-if="previousTo"
      :to="previousTo"
      :aria-label="t('material.previous')"
      class="transition-colors hover:text-black dark:hover:text-white"
      data-testid="previous"
    >
      <IconArrowLeft :size="20" />
    </RouterLink>
    <!-- Dimmed instead of hidden so the other arrow doesn't jump between lessons -->
    <IconArrowLeft
      v-else
      :size="20"
      class="opacity-25"
    />
    <RouterLink
      v-if="nextTo"
      :to="nextTo"
      :aria-label="t('material.next')"
      class="transition-colors hover:text-black dark:hover:text-white"
      data-testid="next"
    >
      <IconArrowRight :size="20" />
    </RouterLink>
    <IconArrowRight
      v-else
      :size="20"
      class="opacity-25"
    />
  </nav>
</template>
