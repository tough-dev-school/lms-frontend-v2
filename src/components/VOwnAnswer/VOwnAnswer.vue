<script lang="ts" setup>
  import { ref, onBeforeMount, onMounted } from 'vue';
  import VOwnAnswerRead from './VOwnAnswerRead.vue';
  import VOwnAnswerEdit from './VOwnAnswerEdit.vue';
  import VOwnAnswerCreate from './VOwnAnswerCreate.vue';
  import {
    useHomeworkAnswerCreateMutation,
    useHomeworkAnswerDeleteMutation,
    useHomeworkAnswerUpdateMutation,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';

  export type Props =
    | { questionId: string; parentId: undefined; answerId: undefined }
    | { questionId: string; parentId?: string; answerId: string };

  const props = defineProps<Props>();

  const emit = defineEmits<{
    mounted: [slug: string];
    delete: [];
    create: [slug: string];
  }>();

  const isEdit = ref(!props.answerId);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteAnswerMutation } =
    useHomeworkAnswerDeleteMutation(queryClient);
  const { mutateAsync: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);
  const { mutateAsync: updateAnswerMutation } =
    useHomeworkAnswerUpdateMutation(queryClient);

  const handleDelete = async () => {
    if (!props.answerId) throw new Error('Answer is required');
    if (confirm('Удалить ответ?')) {
      try {
        await deleteAnswerMutation({
          answerId: props.answerId,
        });

        emit('delete');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCreate = async (text: string) => {
    try {
      const answer = await createAnswerMutation({
        text,
        questionId: props.questionId,
        parentId: props.parentId,
      });

      emit('create', answer.slug);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async (text: string) => {
    if (!props.answerId) throw new Error('Answer is required');
    try {
      await updateAnswerMutation({
        answerId: props.answerId,
        text,
      });

      isEdit.value = false;
    } catch (e) {
      console.error(e);
    }
  };

  onBeforeMount(() => {
    if (!props.answerId) isEdit.value = true;
  });

  onMounted(() => {
    if (props.answerId) emit('mounted', props.answerId);
  });
</script>

<template>
  <div v-if="props.answerId && !isEdit">
    <VOwnAnswerRead
      :answer-id="props.answerId"
      @edit="isEdit = true"
      @delete="handleDelete">
      <template #footer>
        <slot name="footer" />
      </template>
    </VOwnAnswerRead>
  </div>
  <VOwnAnswerEdit
    v-else-if="props.answerId && isEdit"
    :answer-id="props.answerId"
    :question-id="props.questionId"
    :parent-id="props.parentId"
    @save="handleUpdate" />
  <VOwnAnswerCreate
    v-else
    :question-id="props.questionId"
    :parent-id="props.parentId"
    @save="handleCreate" />
</template>

<style lang="scss" scoped>
  .VOwnAnswer {
    &__Container {
      @apply px-0 pt-0 tablet:px-0;
    }
    &__Editor {
      @apply mb-16 rounded-t border-b border-offwhite;
    }
    &__Footer {
    }
  }
</style>
