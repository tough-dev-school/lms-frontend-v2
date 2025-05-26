<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VSendOwnAnswer from '@/components/VSendOwnAnswer/VSendOwnAnswer.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import type {
    QuestionDetail,
    AnswerTree,
    AnswerCrossCheck,
  } from '@/api/generated-api';

  interface Props {
    question: QuestionDetail;
    answer: AnswerTree;
    crosschecks: AnswerCrossCheck[];
    questionId: string;
    answerId: string;
    answerLink?: string;
    isOwnAnswer: boolean;
  }

  defineProps<Props>();

  defineEmits<{
    (e: 'comment', text: string): void;
  }>();
</script>

<template>
  <section class="flex flex-col gap-24">
    <div v-if="isOwnAnswer" class="card mb-16 bg-accent-green">
      <VHeading tag="h3" class="mb-8">
        Поделитесь ссылкой на сделанную домашку
      </VHeading>
      <div class="block select-all">
        {{ answerLink }}
      </div>
    </div>

    <VDetails>
      <template #summary> Текст задания </template>
      <VHtmlContent :content="question.text" />
    </VDetails>
  </section>

  <section class="flex flex-col gap-24">
    <VHeading tag="h2">Коментарии вашей работы</VHeading>
    <VCrossChecks :crosschecks="crosschecks" />
    <VFeedbackGuide />
    <VSendOwnAnswer
      :draft-key="[questionId, answerId]"
      @send="(text) => $emit('comment', text)" />
    <template v-if="answer.descendants">
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :answer-id="comment.slug" />
    </template>
  </section>
</template>
