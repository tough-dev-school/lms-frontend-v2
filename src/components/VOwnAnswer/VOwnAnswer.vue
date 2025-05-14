<script lang="ts" setup>
  import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';
  import VTextEditor from '@/components/VTextEditor/VTextEditor.vue';
  import VButton from '@/components/VButton/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref, onMounted, computed, onBeforeMount, watch } from 'vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import type { Answer, Thread, Comment } from '@/types/homework';
  import dayjs from 'dayjs';
  import { useStorage } from '@vueuse/core';

  export interface Props {
    answer?: Answer | Thread | Comment;
    questionId: string;
    parentId?: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    invalidate: [slug: string];
    mounted: [slug: string | undefined];
  }>();

  const homework = useHomework();

  const isEdit = ref(false);
  const text = ref('');
  const draft = useStorage(
    ['draft', props.questionId, props.parentId].filter(Boolean).join('-'),
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

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(props.answer?.created).unix();

    return !(isDayPassed || props.answer?.hasDescendants);
  });

  const handleEdit = async () => {
    text.value = props.answer ? props.answer.text : draft.value;
    isEdit.value = true;
  };

  const clearDraft = () => {
    text.value = '';
    draft.value = '';
  };

  const handleDelete = async () => {
    if (!props.answer) throw new Error('Answer is required');
    if (confirm('Удалить ответ?')) {
      try {
        await homework.deleteAnswer(props.answer.slug);
        clearDraft();
        emit('invalidate', props.answer.slug);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const createAnswer = async () => {
    try {
      const answer = await homework.postAnswer({
        text: text.value,
        questionId: props.questionId,
        parentId: props.parentId,
      });
      if (!answer) throw new Error('Answer is required');
      emit('invalidate', answer.slug);
      clearDraft();
    } catch (e) {
      console.error(e);
    }
  };

  const updateAnswer = async () => {
    if (isDisabled.value) return;
    if (!props.answer) throw new Error('Answer is required');
    try {
      const answer = await homework.updateAnswer(props.answer.slug, text.value);
      if (!answer) throw new Error('Answer is required');
      emit('invalidate', answer.slug);
      clearDraft();
      isEdit.value = false;
    } catch (e) {
      console.error(e);
    }
  };

  onBeforeMount(() => {
    if (!props.answer) handleEdit();
  });

  onMounted(() => {
    emit('mounted', props.answer?.slug);
  });
</script>

<template>
  <div v-if="answer && isEdit === false">
    <VAnswer :answer="answer" @reaction="emit('invalidate', answer.slug)">
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
