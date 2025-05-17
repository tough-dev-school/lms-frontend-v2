<script lang="ts" setup>
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import dayjs from 'dayjs';
  import { useStorage } from '@vueuse/core';
  import {
    useHomeworkAnswerCreateMutation,
    useHomeworkAnswerDeleteMutation,
    useHomeworkAnswerQuery,
    useHomeworkAnswerUpdateMutation,
  } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import VSendOwnAnswer from '@/components/VSendOwnAnswer/VSendOwnAnswer.vue';

  export type Props =
    | { questionId: string; parentId: undefined; answerId: undefined }
    | { parentId?: string; answerId: string; questionId: string };

  const props = defineProps<Props>();

  const emit = defineEmits<{
    mounted: [slug: string | undefined];
  }>();

  const { data: answer, isSuccess: isAnswerLoaded } = useHomeworkAnswerQuery(
    () => props.answerId,
  );

  const isEdit = ref(!!props.answerId);

  watch(
    () => isAnswerLoaded.value,
    () => {
      isEdit.value = !answer.value;
    },
    {
      immediate: true,
    },
  );

  const text = ref('');
  const draft = useStorage(
    ['draft', props.questionId, props.parentId, props.answerId]
      .filter(Boolean)
      .join('-'),
    '',
    localStorage,
  );
  watch(
    () => text.value,
    (value) => {
      draft.value = value;
    },
  );
  const clearDraft = () => {
    text.value = '';
    draft.value = '';
  };

  const isDisabled = computed(() => !(text.value.length > 0));

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(answer.value?.created).unix();

    return !(isDayPassed || answer.value?.has_descendants);
  });

  const handleEdit = async () => {
    text.value = answer.value?.text ?? draft.value;
    isEdit.value = true;
  };

  const queryClient = useQueryClient();

  const { mutate: deleteAnswerMutation } =
    useHomeworkAnswerDeleteMutation(queryClient);

  const handleDelete = async () => {
    if (!props.answerId) throw new Error('Answer is required');
    if (confirm('Удалить ответ?')) {
      try {
        await deleteAnswerMutation({
          answerId: props.answerId,
        });
        clearDraft();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const { mutate: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);

  const createAnswer = async () => {
    try {
      await createAnswerMutation({
        text: text.value,
        questionId: props.questionId,
        parentId: props.parentId,
      });
      clearDraft();
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate: updateAnswerMutation } =
    useHomeworkAnswerUpdateMutation(queryClient);

  const updateAnswer = async () => {
    if (isDisabled.value) throw new Error('Editing is disabled');
    if (!props.answerId) throw new Error('Answer is required');
    try {
      await updateAnswerMutation({
        answerId: props.answerId,
        text: text.value,
      });
      clearDraft();
      isEdit.value = false;
    } catch (e) {
      console.error(e);
    }
  };

  onBeforeMount(() => {
    if (!props.answerId) handleEdit();
  });

  onMounted(() => {
    emit('mounted', props.answerId);
  });
</script>

<template>
  <div v-if="answer && isEdit === false">
    <VAnswer :answer-id="answer.slug">
      <template #header>
        <VAnswerActions
          v-if="isEditable"
          @edit="handleEdit"
          @delete="handleDelete" />
      </template>
      <template #footer>
        <slot name="footer" />
      </template>
    </VAnswer>
  </div>
  <VSendOwnAnswer
    v-else-if="answer && isEdit === true"
    :initial-text="answer?.text"
    :draft-key="[props.questionId, props.parentId, props.answerId]"
    @send="updateAnswer" />
  <VSendOwnAnswer
    v-else
    :draft-key="[props.questionId, props.parentId]"
    @send="createAnswer" />
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
