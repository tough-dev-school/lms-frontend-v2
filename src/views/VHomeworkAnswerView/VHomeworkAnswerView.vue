<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VAnswer from '@/components/VAnswer/VAnswer.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import VNewAnswer from '@/components/VNewAnswer/VNewAnswer.vue';
  import type { Thread } from '@/types/homework';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';

  const homework = useHomework();
  const { question, answers, crosschecks } = storeToRefs(homework);
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
    await homework.getCrossChecks(questionId);

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
  <VLoggedLayout>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <VHeading tag="h1">{{ question.name }}</VHeading>
      <VDetails>
        <template #title> Задание </template>
        <template #details>
          <VHtmlContent :content="question.text" class="mt-16" />
        </template>
      </VDetails>
      <VAnswer :answer="answer" />
    </section>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <VHeading tag="h2">Коментарии вашей работы</VHeading>
      <VFeedbackGuide />
      <VNewAnswer
        :question-id="question.slug"
        :parent-id="answer.slug"
        @update="prepareForScroll" />
      <VCrossChecks :crosschecks="crosschecks" />
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :original-post="comment"
        @update="prepareForScroll" />
    </section>
  </VLoggedLayout>
</template>
