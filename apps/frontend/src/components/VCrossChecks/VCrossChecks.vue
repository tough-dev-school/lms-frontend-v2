<script setup lang="ts">
  import { getName } from '@/utils/getName';
  import type { CrossCheck } from '@/api/generated';
  import { useI18n } from 'vue-i18n';

  defineProps<{
    crosschecks: CrossCheck[];
  }>();

  const { t } = useI18n();
</script>

<template>
  <div
    class="overflow-hidden rounded bg-white p-16 shadow dark:bg-dark-gray phone:px-24 tablet:px-32"
  >
    <p class="mb-8 font-bold">{{ t('crossChecks.choose') }}</p>
    <ol class="mb-16 list-inside list-decimal">
      <li
        v-for="crosscheck in crosschecks"
        :key="crosscheck.answer.url"
        data-testid="crosscheck"
      >
        <a
          class="link"
          :href="crosscheck.answer.url"
          >{{
            getName({
              firstName: crosscheck.answer.author.first_name,
              lastName: crosscheck.answer.author.last_name,
              randomName: crosscheck.answer.author.random_name,
            })
          }}
          ({{
            crosscheck.is_checked
              ? t('crossChecks.checked')
              : t('crossChecks.notChecked')
          }})</a
        >
      </li>
    </ol>
    <p>
      <b>{{ t('crossChecks.reminderTitle') }}</b>
      {{ t('crossChecks.reminder') }}
    </p>
  </div>
</template>
