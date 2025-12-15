<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { ref, onMounted } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useHomeworkAnswersPartialUpdate,
    useHomeworkAnswersDestroy,
    homeworkAnswersRetrieveQueryKey,
    lmsLessonsListQueryKey,
  } from '@/api/generated';
  import type { AnswerTree, UserSafe } from '@/api/generated';

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
  } = useHomeworkAnswersPartialUpdate({
    mutation: {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: homeworkAnswersRetrieveQueryKey(variables.slug),
        });
        queryClient.invalidateQueries({
          queryKey: lmsLessonsListQueryKey(),
        });
      },
    },
  });
  const { mutateAsync: deleteAnswerMutation, error: deleteError } =
    useHomeworkAnswersDestroy({
      mutation: {
        onSuccess: () => {
          if (props.answer.parent) {
            queryClient.invalidateQueries({
              queryKey: homeworkAnswersRetrieveQueryKey(props.answer.parent),
            });
          }
          queryClient.invalidateQueries({
            queryKey: lmsLessonsListQueryKey(),
          });
        },
      },
    });

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить этот ответ?')) return;
    try {
      await deleteAnswerMutation({
        slug: props.answer.slug,
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
        slug: props.answer.slug,
        data: {
          content: content.value,
        },
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
    :error="updateError || deleteError"
    @send="handleUpdate"
  />
</template>
