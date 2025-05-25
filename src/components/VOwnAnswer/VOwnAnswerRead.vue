<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import dayjs from 'dayjs';
  import { computed } from 'vue';
  import { useHomeworkAnswerQuery } from '@/query';

  const props = defineProps<{
    answerId: string;
  }>();

  const emit = defineEmits<{
    edit: [];
    delete: [];
  }>();

  const { data: answer } = useHomeworkAnswerQuery(() => props.answerId);

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(answer.value?.created).unix();
    return !(isDayPassed || answer.value?.has_descendants);
  });
</script>

<template>
  <VAnswer v-if="answer?.slug" :answer-id="answer.slug">
    <template #header>
      <VAnswerActions
        v-if="isEditable"
        @edit="emit('edit')"
        @delete="emit('delete')" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </VAnswer>
</template>
