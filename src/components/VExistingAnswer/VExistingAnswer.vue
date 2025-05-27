<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import dayjs from 'dayjs';
  import { computed, ref } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useHomeworkAnswerUpdateMutation,
    useHomeworkAnswerDeleteMutation,
  } from '@/query';
  import type { AnswerDetailed } from '@/api/generated-api';

  const props = defineProps<{
    answer: AnswerDetailed;
  }>();

  const emit = defineEmits<{
    'after-delete': [];
  }>();

  const queryClient = useQueryClient();

  const isEdit = ref(false);

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(props.answer.created).unix();
    return !(isDayPassed || props.answer.has_descendants);
  });

  const { mutateAsync: updateAnswerMutation } =
    useHomeworkAnswerUpdateMutation(queryClient);
  const { mutateAsync: deleteAnswerMutation } =
    useHomeworkAnswerDeleteMutation(queryClient);

  const handleDelete = async () => {
    try {
      await deleteAnswerMutation({ answerId: props.answer.slug });
      emit('after-delete');
    } catch (error) {
      console.error(error);
    }
  };

  const text = ref<string>(props.answer.text ?? '');

  const handleUpdate = async () => {
    try {
      await updateAnswerMutation({
        answerId: props.answer.slug,
        text: text.value,
      });
    } catch {}

    isEdit.value = false;
  };
</script>

<template>
  <VAnswer v-if="!isEdit" :answer-id="answer.slug">
    <template #header>
      <VAnswerActions
        v-if="isEditable"
        @edit="isEdit = true"
        @delete="handleDelete" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </VAnswer>
  <VCreateAnswer v-else v-model="text" @send="handleUpdate" />
</template>
