<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VLazyThread from '@/components/VLazyThread.vue';
  import VCard from '@/components/VCard.vue';
  import { watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VPreloader from '@/components/VPreloader.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);
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
