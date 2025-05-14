<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import { computed, onBeforeMount, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import type { Thread } from '@/types/homework';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';

  const homework = useHomework();
  const { question, answers, crosschecks } = storeToRefs(homework);
  const route = useRoute();
  const router = useRouter();

  const answer = computed(() => {
    return answers.value.at(-1) as Thread;
  });

  const prepareForScroll = (slug: string) => {
    router.push({ name: route.name, hash: `#${slug}` });
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

  const answerLink = computed(() => {
    return answer.value
      ? `${window.location.origin}/homework/answers/${answer.value?.slug}`
      : undefined;
  });

  onBeforeMount(async () => {
    await getData();
  });
</script>

<template>
  <VLoggedLayout>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <div v-if="answer" class="card mb-16 bg-accent-green">
        <VHeading tag="h3" class="mb-8">
          Поделитесь ссылкой на сделанную домашку
        </VHeading>
        <div
          class="block select-all"
          :to="{
            name: 'homework-answer',
            params: {
              answerId: answer.slug,
            },
          }">
          {{ answerLink }}
        </div>
      </div>
      <VHeading tag="h1">{{ question.name }}</VHeading>
      <VDetails>
        <template #title>Задание</template>
        <template #details>
          <VHtmlContent :content="question.text" />
        </template>
      </VDetails>
      <VOwnAnswer
        :answer="answer"
        :question-id="question.slug"
        @invalidate="getData" />
    </section>
    <section v-if="question && answer" class="flex flex-col gap-24">
      <VHeading tag="h2">Коментарии вашей работы</VHeading>
      <VFeedbackGuide />
      <VOwnAnswer
        :question-id="question.slug"
        :parent-id="answer.slug"
        @invalidate="prepareForScroll" />
      <VCrossChecks :crosschecks="crosschecks" />
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :original-post="comment"
        @invalidate="prepareForScroll" />
    </section>
  </VLoggedLayout>
</template>
