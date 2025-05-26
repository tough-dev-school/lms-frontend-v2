<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import type { QuestionDetail } from '@/api/generated-api';

  interface Props {
    question: QuestionDetail;
    questionId: string;
  }

  defineProps<Props>();

  defineEmits<{
    (e: 'create', answerId: string): void;
    (e: 'delete'): void;
  }>();
</script>

<template>
  <section class="flex flex-col gap-24">
    <VHtmlContent :content="question.text" />
    <VOwnAnswer
      :question-id="questionId"
      answer-id=""
      @create="(answerId) => $emit('create', answerId)"
      @delete="() => $emit('delete')" />
  </section>
</template>
