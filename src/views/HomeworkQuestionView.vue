<script lang="ts" setup>
  import HtmlContent from '@/components/HtmlContent.vue';
  import TextEditor from '@/components/TextEditor.vue';
  import Button from '@/components/Button.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Heading from '@/components/Heading.vue';
  import Preloader from '@/components/Preloader.vue';
  import { deleteAnswer, getAnswers, updateAnswer } from '@/api/homework';
  import useUser from '@/stores/user';
  import type { Answer } from '@/types/homework';
  import AnswerActions from '@/components/AnswerActions.vue';

  const route = useRoute();
  const homework = useHomework();
  const user = useUser();

  const { question } = storeToRefs(homework);
  const questionId = ref('');
  const editMode = ref(false);

  const text = ref('');

  const setText = (value: string) => {
    text.value = value;
  };

  const hasText = computed(() => !!text.value);

  const saveAnswer = async () => {
    if (answer.value) {
      await updateAnswer(answer.value.slug, text.value);
      editMode.value = false;
    } else {
      await homework.postQuestionAnswer(text.value, questionId.value);
    }
  };

  const answer: Ref<Answer | undefined> = ref(undefined);

  const handleDelete = async () => {
    if (answer.value) await deleteAnswer(answer.value.slug);
  };

  const handleEdit = async () => {
    editMode.value = true;
  };

  onMounted(async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);

    const answers = await getAnswers({
      questionId: questionId.value,
      authorId: user.uuid,
    });

    answer.value = answers.results.find(
      (answer) => answer.author.uuid === user.uuid,
    );
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
      <template v-if="answer && !editMode">
        <HtmlContent :content="answer.text" />
        <AnswerActions
          @delete="handleDelete"
          @edit="handleEdit"
          :date-added="answer.created" />
      </template>
      <template v-else>
        <TextEditor
          @update="setText"
          class="mb-16 rounded border border-gray" />
        <Button @click="saveAnswer" :disabled="!hasText">Отправить</Button>
      </template>
    </section>
  </div>
  <Preloader v-else />
</template>
