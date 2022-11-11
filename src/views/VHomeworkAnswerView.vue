<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VPost from '@/components/VPost.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide.vue';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VPreloader from '@/components/VPreloader.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';
  import VCard from '@/components/VCard.vue';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);
  const route = useRoute();

  const answer = computed(() => {
    return answers.value.at(-1);
  });

  const getData = async () => {
    const { answerId } = route.params;
    await homework.getAnswerById(String(answerId));
    if (!answer.value) return;
    const questionId = answer.value.question;
    await homework.getQuestion(questionId);
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
  <div v-if="question !== undefined && answer !== undefined">
    <section class="mb-64 flex flex-col gap-24">
      <VHeading level="1">{{ question.name }}</VHeading>
      <VCard tag="details">
        <summary>Показать задание</summary>
        <VHtmlContent :content="question.text" class="mt-8" />
      </VCard>
      <VPost :answer="answer" />
    </section>
    <section class="flex flex-col gap-24">
      <VHeading level="2">Обсуждение</VHeading>
      <VFeedbackGuide />
      <VPost
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :answer="comment" />
    </section>
  </div>
  <VPreloader v-else />
</template>
