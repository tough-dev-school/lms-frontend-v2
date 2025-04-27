<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VLazyThread from '@/components/VLazyThread/VLazyThread.vue';
  import VCard from '@/components/VCard/VCard.vue';
  import { watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { storeToRefs } from 'pinia';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useRouteParams } from '@vueuse/router';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);

  const questionId = useRouteParams('questionId', '', {
    transform: (value) => String(value),
  });

  const getData = async () => {
    await homework.getQuestion(questionId.value);
    await homework.getAnswers({ questionId: questionId.value });
  };

  watch(
    () => questionId.value,
    async () => {
      await getData();
    },
    { immediate: true },
  );
</script>

<template>
  <VLoggedLayout>
    <VCard v-if="question" :title="question.name">
      <VHtmlContent :content="question.text" class="mt-8" />
    </VCard>
    <section>
      <VHeading tag="h2" class="mb-24">Ответы</VHeading>
      <div class="flex flex-col gap-24">
        <VLazyThread
          v-for="answer in answers"
          :key="answer.slug"
          :original-post="answer">
        </VLazyThread>
      </div>
    </section>
  </VLoggedLayout>
</template>
