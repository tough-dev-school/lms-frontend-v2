<script lang="ts" setup>
  import { VHeading } from '@/components/VHeading';
  import { VAnswer } from '@/components/VAnswer';
  import { VThread } from '@/components/VThread';
  import { VFeedbackGuide } from '@/components/VFeedbackGuide';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { VPreloader } from '@/components/VPreloader';
  import { VHtmlContent } from '@/components/VHtmlContent';
  import { VCard } from '@/components/VCard';
  import { VNewAnswer } from '@/components/VNewAnswer';
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
      <VHeading tag="h1">{{ question.name }}</VHeading>
      <VCard tag="details">
        <summary>Показать задание</summary>
        <VHtmlContent :content="question.text" class="mt-16" />
      </VCard>
      <VAnswer :answer="answer" @update="getData" />
    </section>
    <section class="flex flex-col gap-24">
      <VHeading tag="h2">Обсуждение</VHeading>
      <VFeedbackGuide />
      <VNewAnswer
        :questionId="question.slug"
        :parentId="answer.slug"
        @update="getData" />
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        @update="getData"
        :originalPost="comment" />
    </section>
  </div>
  <VPreloader v-else />
</template>
