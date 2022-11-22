<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref } from 'vue';
  import VPost from '@/components/VPost.vue';
  import VCard from '@/components/VCard.vue';
  import htmlToMarkdown from '@/utils/htmlToMarkdown';
  import type { Answer } from '@/types/homework';

  export interface Props {
    reply: Answer;
    questionId: string;
    parentId?: string;
  }

  const homework = useHomework();
  const emit = defineEmits(['update']);
  const props = defineProps<Props>();
  const editMode = ref(false);
  const text = ref('');

  const updateAnswer = async () => {
    await homework.updateAnswer(props.reply.slug, text.value);
    emit('update');
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (confirm('Удалить ответ?')) {
      await homework.deleteAnswer(props.reply.slug);
      emit('update');
    }
  };

  const handleEdit = async () => {
    text.value = htmlToMarkdown(props.reply.text);
    editMode.value = true;
  };
</script>

<template>
  <div v-if="!editMode">
    <VPost :answer="reply as Answer" @edit="handleEdit" @delete="handleDelete">
      <template #footer>
        <slot name="post-footer" />
      </template>
    </VPost>
  </div>
  <VCard v-else class="px-0 pt-0 tablet:px-0">
    <VTextEditor
      v-model="text"
      class="mb-16 rounded-t border-b border-offwhite" />
    <div class="flex flex-row-reverse px-32">
      <VButton @click="updateAnswer" class="h-32">Сохранить</VButton>
    </div>
  </VCard>
</template>
