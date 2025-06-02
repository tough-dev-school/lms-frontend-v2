<script setup lang="ts">
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import type { HomeworkStats } from '@/api/generated-api';
  import { computed } from 'vue';
  import { formatDate } from '@/utils/date';
  import dayjs from 'dayjs';

  const props = defineProps<{
    stats: HomeworkStats;
  }>();

  const isOverdue = computed(() => {
    return (
      props.stats.question?.deadline &&
      new Date(props.stats.question.deadline) < new Date() &&
      !props.stats.is_sent
    );
  });

  const isOverCrossCheckDate = computed(() => {
    return (
      props.stats.question?.deadline &&
      dayjs(props.stats.question.deadline).add(1, 'day').isAfter(new Date())
    );
  });

  const crossCheckDate = computed(
    () =>
      props.stats.question.deadline &&
      dayjs(props.stats.question.deadline).add(1, 'day'),
  );
</script>

<template>
  <VPill>
    <VPillItem>
      Домашка:
      {{ stats.is_sent ? 'Отправлена' : 'Не отправлена' }}
    </VPillItem>
    <VPillItem v-if="stats.is_sent && stats.crosschecks">
      <div>
        <div>
          Работы коллег:
          {{ stats.crosschecks?.checked }} /
          {{ stats.crosschecks?.total }}
        </div>
        <div v-if="crossCheckDate && !isOverCrossCheckDate">
          Задание появится:
          {{ formatDate(crossCheckDate) }}
        </div>
      </div>
    </VPillItem>
    <VPillItem
      v-if="stats.question?.deadline"
      :class="{ 'text-red': isOverdue }">
      <div>
        <div>Дедлайн: {{ formatDate(stats.question?.deadline) }}</div>
        <div v-if="isOverdue">Просрочен</div>
      </div>
    </VPillItem>
  </VPill>
</template>
