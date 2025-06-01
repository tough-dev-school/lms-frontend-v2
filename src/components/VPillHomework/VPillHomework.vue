<script setup lang="ts">
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';
  import type { HomeworkStats } from '@/api/generated-api';
  import { computed } from 'vue';
  import dayjs from 'dayjs';
  import { formatDate } from '@/utils/date';

  const props = defineProps<{
    stats: HomeworkStats;
  }>();

  const isOverdue = computed(() => {
    return (
      props.stats.question?.deadline &&
      new Date(props.stats.question.deadline) < new Date()
    );
  });

  const crossCheckDate = computed(() => dayjs(props.stats.question?.deadline));
</script>

<template>
  <VPill>
    <VPillItem>
      Домашка:
      {{ stats.is_sent ? 'Проверена' : 'Не проверена' }}
    </VPillItem>
    <VPillItem>
      <div>
        <div>
          Работы коллег:
          {{ stats.crosschecks?.checked }} /
          {{ stats.crosschecks?.total }}
        </div>
        <div v-if="stats.question?.deadline">
          Задание появится:
          {{ crossCheckDate }}
        </div>
      </div>
    </VPillItem>
    <VPillItem
      v-if="stats.question?.deadline"
      :class="{ 'text-red-500': isOverdue }">
      <div>
        <div>Дедлайн: {{ formatDate(stats.question?.deadline) }}</div>
        <div v-if="isOverdue">Просрочен</div>
      </div>
    </VPillItem>
  </VPill>
</template>
