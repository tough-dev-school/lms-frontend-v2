<script lang="ts" setup>
  import { VHtmlContent } from '@/components/VHtmlContent';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { VHeading } from '@/components/VHeading';
  import { VPreloader } from '@/components/VPreloader';
  import { VOwnAnswer } from '@/components/VOwnAnswer';
  import { VNewAnswer } from '@/components/VNewAnswer';
  import { VCard } from '@/components/VCard';
  import useUser from '@/stores/user';

  const route = useRoute();
  const homework = useHomework();
  const user = useUser();

  const { question, answers } = storeToRefs(homework);
  const questionId: Ref<string | undefined> = ref(undefined);

  const answer = computed(() => {
    return answers.value.at(-1);
  });

  const getData = async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
    await homework.getAnswers({
      questionId: questionId.value,
      authorId: user.uuid,
    });
  };

  const answerLink = computed(() => {
    return answer.value
      ? `${window.location.origin}/homework/answers/${answer.value?.slug}`
      : undefined;
  });

  onMounted(async () => {
    await getData();
  });
</script>

<template>
  <div v-if="question !== undefined && questionId">
    <VCard class="mb-64">
      <VHeading tag="h1" class="mb-24">{{ question.name }}</VHeading>
      <VHtmlContent :content="question.text" />
    </VCard>
    <section>
      <VHeading tag="h2" class="mb-24">Ответ</VHeading>

      <VCard class="mb-16 bg-yellow-light" v-if="answer">
        <VHeading tag="h3" class="mb-8"
          >Поделиться ссылкой на сделанную домашку</VHeading
        >
        <RouterLink
          class="link block"
          :to="{
            name: 'homework-answer',
            params: {
              answerId: answer.slug,
            },
          }"
          >{{ answerLink }}</RouterLink
        >
      </VCard>

      <VOwnAnswer
        :answer="answer"
        v-if="answer"
        @update="getData"
        :questionId="questionId" />
      <VNewAnswer v-else @update="getData" :questionId="questionId" />
    </section>
  </div>
  <VPreloader v-else />
</template>
