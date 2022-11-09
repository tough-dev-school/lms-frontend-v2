<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent.vue';
  import VTextEditor from '@/components/VTextEditor.vue';
  import VButton from '@/components/VButton.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import VHeading from '@/components/VHeading.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import useUser from '@/stores/user';
  import VAnswerActions from '@/components/VAnswerActions.vue';
  import htmlToMarkdown from '@/utils/htmlToMarkdown';

  const route = useRoute();
  const homework = useHomework();
  const user = useUser();

  const { question, answers } = storeToRefs(homework);
  const questionId: Ref<string | undefined> = ref(undefined);

  const answer = computed(() => {
    return answers.value.at(-1);
  });

  const editMode = ref(false);

  const text = ref('');

  const handleEditorUpdate = (value: string) => {
    text.value = value;
  };

  const saveAnswer = async () => {
    if (answer.value) {
      await homework.updateAnswer(answer.value.slug, text.value);
    } else if (questionId.value) {
      await homework.postAnswer(text.value, questionId.value);
    }
    await getData();
    editMode.value = false;
  };

  const handleDelete = async () => {
    if (!answer.value) return;
    if (confirm('Удалить ответ?')) {
      await homework.deleteAnswer(answer.value.slug);
      await getData();
    }
  };

  const handleEdit = async () => {
    if (!answer.value) return;
    handleEditorUpdate(htmlToMarkdown(answer.value.text));
    editMode.value = true;
  };

  const getData = async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
    await homework.getAnswers({
      questionId: questionId.value,
      authorId: user.uuid,
    });
  };

  onMounted(async () => {
    await getData();
  });
</script>

<template>
  <div v-if="question !== undefined">
    <section class="mb-64">
      <VHeading level="1" class="mb-24">{{ question.name }}</VHeading>
      <VHtmlContent :content="question.text" />
    </section>
    <section>
      <VHeading level="2" class="mb-24">Ответ</VHeading>
      <div v-if="answer && !editMode" data-testid="answer">
        <VHtmlContent :content="answer.text" />
        <VAnswerActions
          @delete="handleDelete"
          @edit="handleEdit"
          :date-added="answer.created" />
      </div>
      <div v-else data-testid="editor">
        <VTextEditor
          @update="handleEditorUpdate"
          :value="text"
          class="mb-16 rounded border border-gray" />
        <VButton @click="saveAnswer" :disabled="!text">Отправить</VButton>
      </div>
    </section>
  </div>
  <VPreloader v-else />
</template>
