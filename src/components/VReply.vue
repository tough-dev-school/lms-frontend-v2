<script lang="ts" setup>
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { ref, computed } from 'vue';
  import VPost from '@/components/VPost.vue';
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

  const hasReply = computed(() => !!props.reply.slug);
</script>

<template>
  <div v-if="hasReply && !editMode">
    <VPost :answer="reply" @edit="handleEdit" @delete="handleDelete" />
  </div>
  <div v-else>
    <VTextEditor
      @update="handleEditorUpdate"
      :value="reply.text"
      class="mb-16 rounded shadow" />
    <VButton @click="saveAnswer" v-if="!hasReply">Отправить</VButton>
    <VButton @click="updateAnswer" v-else>Сохранить</VButton>
  </div>
</template>
