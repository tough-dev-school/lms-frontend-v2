<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VPreloader from '@/components/VPreloader/VPreloader.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VNewAnswer from '@/components/VNewAnswer/VNewAnswer.vue';
  import type { Thread } from '@/types/homework';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);
  const route = useRoute();
  const router = useRouter();

  const answer = computed(() => {
    return answers.value.at(-1) as Thread;
  });

  const prepareForScroll = (slug: string) => {
    if (route.name) {
      router.push({ name: route.name, hash: `#${slug}` });
    }
  };

  const getData = async (slug?: string) => {
    const { answerId } = route.params;
    await homework.getAnswerById(String(answerId), true);
    if (!answer.value) return;
    const questionId = answer.value.question;
    await homework.getQuestion(questionId);

    if (slug) prepareForScroll(slug);
  };

  const answerId = computed(() => route.params.answerId);

  watch(
    answerId,
    async () => {
      await getData();
    },
    { immediate: true },
  );
</script>

<template>
  <div v-if="question !== undefined && answer !== undefined">
    <section class="mb-64 flex flex-col gap-24">
      <VHeading tag="h1">{{ question.name }}</VHeading>
      <VCard tag="details">
        <summary>Показать задание</summary>
        <VHtmlContent :content="question.text" class="mt-16" />
      </VCard>
      <VAnswer :answer="answer" @update="prepareForScroll" />
    </section>
    <section class="flex flex-col gap-24">
      <VHeading tag="h2">Обсуждение</VHeading>
      <VFeedbackGuide />
      <VNewAnswer
        :question-id="question.slug"
        :parent-id="answer.slug"
        @update="prepareForScroll" />
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :original-post="comment"
        @update="prepareForScroll" />
    </section>
  </div>
  <VPreloader v-else />
</template>
