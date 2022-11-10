<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent.vue';
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref } from 'vue';
  import VAnswerActions from '@/components/VAnswerActions.vue';
  import htmlToMarkdown from '@/utils/htmlToMarkdown';

  const homework = useHomework();

  const emit = defineEmits('update');

  const props = defineProps({
    reply: {
      type: Object,
      default() {
        return {};
      },
    },
    questionId: { type: String, required: true },
  });

  const editMode = ref(false);

  const text = ref('');

  const handleEditorUpdate = (value: string) => {
    text.value = value;
  };

  const saveAnswer = async () => {
    await homework.postAnswer(text.value, props.questionId);
    emit('update');
  };

  const updateAnswer = async () => {
    await homework.updateAnswer(props.reply.slug, text.value);
    emit('update');
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (!props.reply.text) return;
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
</script>

<template>
  <div v-if="reply.slug && editMode === false">
    <VHtmlContent :content="reply.text" />
    <VAnswerActions
      @delete="handleDelete"
      @edit="handleEdit"
      :date-added="reply.created" />
  </div>
  <div v-else>
    <VTextEditor
      @update="handleEditorUpdate"
      :value="reply.text"
      class="mb-16 rounded border border-gray" />
    <VButton @click="saveAnswer" v-if="!reply">Отправить</VButton>
    <VButton @click="updateAnswer" v-else>Сохранить</VButton>
  </div>
</template>
