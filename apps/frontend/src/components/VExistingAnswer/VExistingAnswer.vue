<script lang="ts" setup>
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { computed, ref, onMounted } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useHomeworkAnswersPartialUpdate,
    useHomeworkAnswersDestroy,
    homeworkAnswersRetrieveQueryKey,
    lmsLessonsListQueryKey,
  } from '@/api/generated';
  import type { AnswerTree, UserSafe } from '@/api/generated';
  import { useI18n } from 'vue-i18n';
  import { useAnswerAttachmentsUpload } from '@/composables/useAnswerAttachmentsUpload';

  const props = defineProps<{
    answer: AnswerTree;
    user: UserSafe;
  }>();

  const emit = defineEmits<{
    'after-delete': [];
    'after-create': [slug: string];
  }>();

  const queryClient = useQueryClient();
  const { t } = useI18n();

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
    if (!confirm(t('answer.deleteConfirm'))) return;
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
  const files = ref<File[]>([]);

  // Attachments belong to the homework answer itself, comments stay text only
  const allowAttachments = computed(() => !props.answer.parent);

  const {
    upload: uploadAttachments,
    isPending: isUploadPending,
    error: uploadError,
  } = useAnswerAttachmentsUpload();

  const handleUpdate = async () => {
    try {
      await updateAnswerMutation({
        slug: props.answer.slug,
        data: {
          content: content.value,
        },
      });
      await uploadAttachments(props.answer.slug, files);
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
    v-model:files="files"
    :legacy-text="answer.legacy_text"
    :is-pending="isUpdatePending || isUploadPending"
    :error="updateError || deleteError || uploadError"
    :allow-attachments="allowAttachments"
    :existing-attachments="answer.attachments"
    @send="handleUpdate"
  />
</template>
