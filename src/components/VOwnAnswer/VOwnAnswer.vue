<script lang="ts" setup>
  import type { Answer, Comment, Thread } from '@/types/homework';

  import { VAnswer } from '@/components/VAnswer';
  import { VAnswerActions } from '@/components/VAnswerActions';
  import { VButton } from '@/components/VButton';
  import { VCard } from '@/components/VCard';
  import { VTextEditor } from '@/components/VTextEditor';
  import useHomework from '@/stores/homework';
  import dayjs from 'dayjs';
  import { computed, onMounted, ref } from 'vue';

  export interface Props {
    answer: Answer | Comment | Thread;
    parentId?: string;
    questionId: string;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    delete: [];
    edit: [];
    mounted: [slug: string];
    update: [];
  }>();

  const homework = useHomework();

  const editMode = ref(false);
  const text = ref('');

  const isDisabled = computed(() => !(text.value.length > 0));

  const isEditable = computed(() => {
    const isDayPassed = dayjs().unix() < dayjs(props.answer.created).unix();

    return !(isDayPassed || props.answer.hasDescendants);
  });

  const updateAnswer = async () => {
    if (isDisabled.value) return;
    await homework.updateAnswer(props.answer.slug, text.value);
    emit('update');
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (confirm('Удалить ответ?')) {
      await homework.deleteAnswer(props.answer.slug);
      emit('update');
    }
  };

  const handleEdit = async () => {
    text.value = props.answer.text;
    editMode.value = true;
  };

  onMounted(() => {
    emit('mounted', props.answer.slug);
  });
</script>

<template>
  <div v-if="!editMode">
    <VAnswer @update="emit('update')" :answer="answer as Answer">
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
  <VCard v-else class="px-0 pt-0 tablet:px-0">
    <VTextEditor
      v-model="text"
      @send="updateAnswer"
      class="mb-16 rounded-t border-b border-offwhite" />
    <div class="flex flex-row-reverse px-32">
      <VButton @click="updateAnswer" :disabled="isDisabled" class="h-32"
        >Сохранить</VButton
      >
    </div>
  </VCard>
</template>
