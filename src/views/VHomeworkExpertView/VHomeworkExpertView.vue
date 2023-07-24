<script lang="ts" setup>
  import { VCard } from '@/components/VCard';
  import { VHeading } from '@/components/VHeading';
  import { VHtmlContent } from '@/components/VHtmlContent';
  import { VLazyThread } from '@/components/VLazyThread';
  import { VPreloader } from '@/components/VPreloader';
  import useHomework from '@/stores/homework';
  import { storeToRefs } from 'pinia';
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';

  const homework = useHomework();
  const { answers, question } = storeToRefs(homework);
  const route = useRoute();

  const getData = async () => {
    const questionId = String(route.params.questionId);
    await homework.getQuestion(questionId);
    await homework.getAnswers({ questionId });
  };

  watch(
    () => route.params,
    async () => {
      await getData();
    },
    { immediate: true },
  );
</script>

<template>
  <div v-if="question !== undefined && answers.length > 0">
    <VCard class="mb-64">
      <VHeading tag="h1" class="mb-24">{{ question.name }}</VHeading>
      <VHtmlContent :content="question.text" class="mt-8" />
    </VCard>
    <section>
      <VHeading tag="h2" class="mb-24">Ответы</VHeading>
      <div class="flex flex-col gap-24">
        <VLazyThread
          v-for="answer in answers"
          :show-go-to-answer="true"
          :key="answer.slug"
          :originalPost="answer">
        </VLazyThread>
      </div>
    </section>
  </div>
  <VPreloader v-else />
</template>
