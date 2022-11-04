<script lang="ts" setup>
  import HtmlContent from '@/components/HtmlContent.vue';
  import TextEditor from '@/components/TextEditor.vue';
  import Button from '@/components/Button.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Heading from '@/components/Heading.vue';
  import Preloader from '@/components/Preloader.vue';
  import useUser from '@/stores/user';
  import AnswerActions from '@/components/AnswerActions.vue';

  const route = useRoute();
  const homework = useHomework();
  const user = useUser();

  const { question, answer } = storeToRefs(homework);
  const questionId: Ref<string | undefined> = ref(undefined);

  const editMode = ref(false);

  const text = ref('');

  const handleEditorUpdate = (value: string) => {
    text.value = value;
  };

  const saveAnswer = async () => {
    if (answer.value) {
      await homework.updateAnswer(answer.value.slug, text.value);
      editMode.value = false;
    } else {
      await homework.postAnswer(text.value, questionId.value);
    }
  };

  const handleDelete = async () => {
    if (answer.value) await homework.deleteAnswer(answer.value.slug);
  };

  const handleEdit = async () => {
    editMode.value = true;
  };

  onMounted(async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
    await homework.findAnswer(questionId.value, user.uuid);
  });
</script>

<template>
  <div v-if="question !== undefined">
    <section class="mb-64">
      <Heading level="1" class="mb-24">{{ question.name }}</Heading>
      <HtmlContent :content="question.text" />
    </section>
    <section>
      <Heading level="2" class="mb-24">Ответ</Heading>
      <div v-if="answer && !editMode" data-testid="answer">
        <HtmlContent :content="answer.text" />
        <AnswerActions
          @delete="handleDelete"
          @edit="handleEdit"
          :date-added="answer.created" />
      </div>
      <div v-else data-testid="editor">
        <TextEditor
          @update="handleEditorUpdate"
          class="mb-16 rounded border border-gray" />
        <Button @click="saveAnswer" :disabled="!text">Отправить</Button>
      </div>
    </section>
  </div>
  <Preloader v-else />
</template>
