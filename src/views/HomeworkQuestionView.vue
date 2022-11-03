<script lang="ts" setup>
  import HtmlContent from '@/components/HtmlContent.vue';
  import TextEditor from '@/components/TextEditor.vue';
  import Button from '@/components/Button.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Heading from '@/components/Heading.vue';
  import Preloader from '@/components/Preloader.vue';

  const route = useRoute();
  const homework = useHomework();

  const { question } = storeToRefs(homework);
  const questionId = ref('');

  onMounted(async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
  });

  const text = ref('');

  const setText = (value: string) => {
    text.value = value;
  };

  const hasText = computed(() => !!text.value);

  const sendAnswer = async () => {
    await homework.postQuestionAnswer(text.value, questionId.value);
  };
</script>

<template>
  <div v-if="question !== undefined">
    <section class="mb-64">
      <Heading level="1" class="mb-24">{{ question.name }}</Heading>
      <HtmlContent :content="question.text" />
    </section>
    <section>
      <Heading level="2" class="mb-24">Ответ</Heading>
      <TextEditor @update="setText" class="mb-16 rounded border border-gray" />
      <Button @click="sendAnswer" :disabled="!hasText">Отправить</Button>
    </section>
  </div>
  <Preloader v-else />
</template>
