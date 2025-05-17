<script lang="ts" setup>
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
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

  export type Props =
    | { questionId: string; parentId: undefined; answerId: undefined }
    | { parentId?: string; answerId: string; questionId?: string };

  const props = defineProps<Props>();

  const emit = defineEmits<{
    mounted: [slug: string | undefined];
  }>();

  const isEdit = ref(false);
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

  const isDisabled = computed(() => !(text.value.length > 0));

  const { data: answer, isSuccess } = useHomeworkAnswerQuery(
    () => props.answerId,
  );

  watch(
    () => isSuccess.value,
    () => {
      isEdit.value = true;
    },
    {
      immediate: true,
    },
  );

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(answer.value?.created).unix();

    return !(isDayPassed || answer.value?.has_descendants);
  });

  const handleEdit = async () => {
    text.value = answer.value?.text ?? draft.value;
    isEdit.value = true;
  };

  const clearDraft = () => {
    text.value = '';
    draft.value = '';
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
    if (isDisabled.value) return;
    if (!props.answerId) throw new Error('Answer is required');
    try {
      const answer = await updateAnswerMutation({
        answerId: props.answerId,
        data: {
          text: text.value,
        },
      });
      if (!answer) throw new Error('Answer is required');
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
  <div v-else-if="answer && isEdit === true">
    <div class="VOwnAnswer__Container">
      <VTextEditor
        v-model="text"
        class="VOwnAnswer__Editor"
        @send="updateAnswer" />
      <div class="VOwnAnswer__Footer">
        <VButton :disabled="isDisabled" class="h-32" @click="updateAnswer">
          Сохранить изменения
        </VButton>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="VOwnAnswer__Container">
      <VTextEditor
        v-model="text"
        class="VOwnAnswer__Editor"
        @send="createAnswer" />
      <div class="VOwnAnswer__Footer">
        <VButton :disabled="isDisabled" class="h-32" @click="createAnswer">
          Сохранить
        </VButton>
      </div>
    </div>
  </div>
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
