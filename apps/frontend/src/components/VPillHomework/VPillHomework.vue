<script setup lang="ts">
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import type { Lesson } from '@/api';
  import { computed } from 'vue';
  import { DATE_TIME_FORMAT, formatDate } from '@/utils/date';
  import dayjs from 'dayjs';

  const props = defineProps<{
    lesson: { question: Lesson['question']; homework: Lesson['homework'] };
  }>();

  const isOverdue = computed(() => {
    return (
      props.lesson.question?.deadline &&
      new Date(props.lesson.question.deadline) < new Date() &&
      !props.lesson.homework.is_sent
    );
  });

  const isOverCrossCheckDate = computed(() => {
    return (
      props.lesson.question?.deadline &&
      crossCheckDate.value &&
      dayjs().isAfter(crossCheckDate.value)
    );
  });

  const crossCheckDate = computed(
    () =>
      props.lesson.question.deadline &&
      dayjs(props.lesson.question.deadline).add(1, 'day'),
  );
</script>

<template>
  <VPill>
    <VPillItem>
      Домашка:
      {{ lesson.homework.is_sent ? 'Отправлена' : 'Не отправлена' }}
    </VPillItem>
    <VPillItem
      v-if="lesson.homework.is_sent && lesson.homework.crosschecks"
      :class="{ 'text-gray': crossCheckDate && !isOverCrossCheckDate }"
    >
      <div>
        <div>
          Работы на проверку:
          {{ lesson.homework.crosschecks?.checked }} /
          {{ lesson.homework.crosschecks?.total }}
        </div>
        <div v-if="crossCheckDate && !isOverCrossCheckDate">
          отправим
          {{ formatDate(crossCheckDate, DATE_TIME_FORMAT) }}
        </div>
      </div>
    </VPillItem>
    <VPillItem
      v-if="lesson.question?.deadline"
      :class="{ 'text-red': isOverdue }"
    >
      <div>
        <div>
          Дедлайн: {{ formatDate(lesson.question?.deadline, DATE_TIME_FORMAT) }}
        </div>
        <div v-if="isOverdue">Просрочен</div>
      </div>
    </VPillItem>
  </VPill>
</template>
