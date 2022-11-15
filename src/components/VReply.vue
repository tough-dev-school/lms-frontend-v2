<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref, computed, withDefaults } from 'vue';
  import VPost from '@/components/VPost.vue';
  import VCard from '@/components/VCard.vue';
  import htmlToMarkdown from '@/utils/htmlToMarkdown';
  import type { Answer } from '@/types/homework';

  export type DraftAnswer = Partial<Answer>;

  export interface Props {
    reply?: Answer | DraftAnswer;
    questionId: string;
    parentId?: string;
  }

  const homework = useHomework();

  const emit = defineEmits(['update']);

  const props = withDefaults(defineProps<Props>(), {
    reply: (): DraftAnswer => {
      return {};
    },
  });

  const editMode = ref(false);

  const text = ref('');

  const handleEditorUpdate = (value: string) => {
    text.value = value;
  };

  const saveAnswer = async () => {
    await homework.postAnswer({
      text: text.value,
      questionId: props.questionId,
      parentId: props.parentId,
    });
    text.value = '';
    emit('update');
  };

  const updateAnswer = async () => {
    if (!props.reply.slug) return;
    await homework.updateAnswer(props.reply.slug, text.value);
    emit('update');
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (!props.reply.slug) return;
    if (confirm('Удалить ответ?')) {
      await homework.deleteAnswer(props.reply.slug);
      emit('update');
    }
  };

  const handleEdit = async () => {
    if (!props.reply.text) return;
    handleEditorUpdate(htmlToMarkdown(props.reply.text));
    editMode.value = true;
  };

  const hasReply = computed(() => !!props.reply.slug);
</script>

<template>
  <div v-if="hasReply && !editMode">
    <VPost :answer="reply as Answer" @edit="handleEdit" @delete="handleDelete">
      <template #footer>
        <slot name="post-footer" />
      </template>
    </VPost>
  </div>
  <VCard v-else class="px-0 pt-0 tablet:px-0">
    <VTextEditor
      @update="handleEditorUpdate"
      :value="reply.text"
      class="mb-16 rounded-t border-b border-offwhite" />
    <div class="flex flex-row-reverse px-32">
      <VButton
        @click="saveAnswer"
        v-if="!hasReply"
        class="max-h-32 min-w-0 px-24"
        >Отправить</VButton
      >
      <VButton @click="updateAnswer" v-else class="h-32">Сохранить</VButton>
    </div>
  </VCard>
</template>
