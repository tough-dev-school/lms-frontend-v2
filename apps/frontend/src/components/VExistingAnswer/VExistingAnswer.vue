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
  import type { AnswerTree, UserSafe } from '@/api/generated-api';

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

  const { mutateAsync: updateAnswerMutation, isPending: isUpdatePending } =
    useHomeworkAnswerUpdateMutation(queryClient);
  const { mutateAsync: deleteAnswerMutation } =
    useHomeworkAnswerDeleteMutation(queryClient);

  const handleDelete = async () => {
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

  const html = ref<string>(props.answer.text ?? '');
  const markdown = ref<string>(props.answer.src ?? '');

  const handleUpdate = async () => {
    try {
      await updateAnswerMutation({
        answerId: props.answer.slug,
        textInMarkdown: markdown.value,
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
  <VAnswer v-if="!isEdit" :answer="answer" :user="user">
    <template #header>
      <VAnswerActions
        v-if="answer.is_editable"
        @edit="isEdit = true"
        @delete="handleDelete" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </VAnswer>
  <VCreateAnswer
    v-else-if="isEdit"
    v-model:html="html"
    v-model:markdown="markdown"
    :is-pending="isUpdatePending"
    @send="handleUpdate" />
</template>
