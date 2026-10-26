<script setup lang="ts">
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import type { Lesson } from '@/api/generated';
  import { computed } from 'vue';
  import { useDate } from '@/composables/useDate';
  import dayjs from 'dayjs';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    lesson: { question: Lesson['question']; homework: Lesson['homework'] };
  }>();

  const { t } = useI18n();
  const { formatDate } = useDate();

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
      {{
        t('homeworkPill.homework', {
          status: lesson.homework.is_sent
            ? t('common.homeworkSent')
            : t('common.homeworkNotSent'),
        })
      }}
    </VPillItem>
    <VPillItem
      v-if="lesson.homework.is_sent && lesson.homework.crosschecks"
      :class="{ 'text-gray': crossCheckDate && !isOverCrossCheckDate }"
    >
      <div>
        <div>
          {{
            t('homeworkPill.toCheck', {
              checked: lesson.homework.crosschecks?.checked,
              total: lesson.homework.crosschecks?.total,
            })
          }}
        </div>
        <div v-if="crossCheckDate && !isOverCrossCheckDate">
          {{
            t('homeworkPill.willSend', {
              date: formatDate(crossCheckDate, 'dateTime'),
            })
          }}
        </div>
      </div>
    </VPillItem>
    <VPillItem
      v-if="lesson.question?.deadline"
      :class="{ 'text-red': isOverdue }"
    >
      <div>
        <div>
          {{
            t('homeworkPill.deadline', {
              date: formatDate(lesson.question?.deadline, 'dateTime'),
            })
          }}
        </div>
        <div v-if="isOverdue">{{ t('homeworkPill.overdue') }}</div>
      </div>
    </VPillItem>
  </VPill>
</template>
