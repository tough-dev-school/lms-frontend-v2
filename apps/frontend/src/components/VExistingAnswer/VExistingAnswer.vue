<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { ref, onMounted } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useHomeworkAnswerUpdateMutation,
    useHomeworkAnswerDeleteMutation,
  } from '@/query';
  import type { AnswerTree, UserSafe } from '@/api/generated/generated-api';

  const props = defineProps<{
    answer: AnswerTree;
    user: UserSafe;
  }>();

  const emit = defineEmits<{
    'after-delete': [];
    'after-create': [slug: string];
  }>();

  const queryClient = useQueryClient();

  const isEdit = ref(false);

  const {
    mutateAsync: updateAnswerMutation,
    error: updateError,
    isPending: isUpdatePending,
  } = useHomeworkAnswerUpdateMutation(queryClient);
  const { mutateAsync: deleteAnswerMutation, error: deleteError } =
    useHomeworkAnswerDeleteMutation(queryClient);

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить этот ответ?')) return;
    try {
      await deleteAnswerMutation({
        answerId: props.answer.slug,
        parentId: props.answer.parent,
      });
      emit('after-delete');
    } catch (error) {
      console.error(error);
    }
  };

  const content = ref<Record<string, unknown>>(props.answer.content);

  const handleUpdate = async () => {
    try {
      await updateAnswerMutation({
        answerId: props.answer.slug,
        content: content.value,
      });
      isEdit.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  onMounted(() => {
    emit('after-create', props.answer.slug);
  });
</script>

<template>
  <VAnswer
    v-if="!isEdit"
    :answer="answer"
    :user="user"
  >
    <template #header>
      <VAnswerActions
        v-if="answer.is_editable"
        @edit="isEdit = true"
        @delete="handleDelete"
      />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </VAnswer>
  <VCreateAnswer
    v-else-if="isEdit"
    v-model="content"
    :legacy-text="answer.legacy_text"
    :is-pending="isUpdatePending"
    :error="() => [...updateError, ...deleteError]"
    @send="handleUpdate"
  />
</template>
