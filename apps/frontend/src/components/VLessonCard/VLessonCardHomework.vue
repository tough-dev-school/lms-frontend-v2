<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VTag from '@/components/VTag/VTag.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import type { Lesson } from '@/api/generated';
  import { DATE_TIME_FORMAT, formatDate } from '@/utils/date';

  defineProps<{
    homework: NonNullable<Lesson['homework']>;
    question: NonNullable<Lesson['question']>;
  }>();
</script>

<template>
  <div class="flex flex-col gap-16">
    <div class="flex flex-wrap gap-8 empty:hidden">
      <VTag v-if="question.deadline">
        Дедлайн
        {{ formatDate(question.deadline, DATE_TIME_FORMAT) }}
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
          <td class="font-bold">Статус</td>
          <td class="whitespace-nowrap text-right">
            {{ homework.is_sent ? 'Отправлена' : 'Не отправлена' }}
          </td>
        </tr>
        <tr v-if="homework.crosschecks">
          <td class="font-bold">Проверенные домашки коллег</td>
          <td class="text-right">
            {{ homework.crosschecks.checked }} из
            {{ homework.crosschecks.total }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="flex-grow"></div>

  <RouterLink
    :to="{
      name: 'homework',
      params: { questionId: question.slug },
    }"
  >
    <VButton class="VLessonCard__Button"> Открыть </VButton>
  </RouterLink>
</template>
