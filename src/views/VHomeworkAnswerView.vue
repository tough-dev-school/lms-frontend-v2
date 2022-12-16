<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VAnswer from '@/components/VAnswer.vue';
  import VThread from '@/components/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide.vue';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VPreloader from '@/components/VPreloader.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';
  import VCard from '@/components/VCard.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import type { Thread } from '@/types/homework';
  import useToasts from '@/stores/toasts';
  import { ClipboardCopyIcon } from 'vue-tabler-icons';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);
  const route = useRoute();
  const toast = useToasts();

  const answer = computed(() => {
    return answers.value.at(-1) as Thread;
  });

  const getData = async () => {
    const { answerId } = route.params;
    await homework.getAnswerById(String(answerId), true);
    if (!answer.value) return;
    const questionId = answer.value.question;
    await homework.getQuestion(questionId);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.addMessage('Ссылка скопирована', 'success');
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
        <VHtmlContent :content="question.text" class="mt-8" />
      </VCard>
      <VAnswer :answer="answer">
        <template #header>
          <button
            class="cursor-pointer text-gray transition-colors hover:text-black"
            @click="copyLink">
            <span class="hidden tablet:block">Скопировать ссылку</span>
            <ClipboardCopyIcon class="tablet:hidden" />
          </button>
        </template>
      </VAnswer>
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
