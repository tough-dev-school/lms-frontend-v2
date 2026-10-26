<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VTag from '@/components/VTag/VTag.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type { Lesson } from '@/api/generated';
  import { useDate } from '@/composables/useDate';
  import { Link } from '@inertiajs/vue3';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';

  defineProps<{
    homework: NonNullable<Lesson['homework']>;
    question: NonNullable<Lesson['question']>;
  }>();

  const { t } = useI18n();
  const { formatDate } = useDate();
</script>

<template>
  <div class="flex flex-col gap-16">
    <div class="flex flex-wrap gap-8 empty:hidden">
      <VTag v-if="question.deadline">
        {{
          t('lesson.deadline', {
            date: formatDate(question.deadline, 'dateTime'),
          })
        }}
      </VTag>
    </div>
    <VHeading
      tag="h3"
      class="mb-8"
    >
      {{ question.name }}
    </VHeading>
  </div>

  <div>
    <table class="w-full">
      <tbody>
        <tr>
          <td class="font-bold">{{ t('lesson.status') }}</td>
          <td class="whitespace-nowrap text-right">
            {{
              homework.is_sent
                ? t('common.homeworkSent')
                : t('common.homeworkNotSent')
            }}
          </td>
        </tr>
        <tr v-if="homework.crosschecks">
          <td class="font-bold">{{ t('lesson.checkedCrosschecks') }}</td>
          <td class="text-right">
            {{
              t('lesson.checkedOf', {
                checked: homework.crosschecks.checked,
                total: homework.crosschecks.total,
              })
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex-grow"></div>

  <Link :href="urls.homework(question.slug)">
    <VButton class="VLessonCard__Button"> {{ t('lesson.open') }} </VButton>
  </Link>
</template>
