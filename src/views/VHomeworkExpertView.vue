<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VPost from '@/components/VPost.vue';
  import { computed, watch } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import VPreloader from '@/components/VPreloader.vue';
  import VHtmlContent from '@/components/VHtmlContent.vue';

  const homework = useHomework();
  const { question, answers } = storeToRefs(homework);
  const route = useRoute();

  const answer = computed(() => {
    return answers.value.at(-1);
  });

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
  <div v-if="question !== undefined && answer !== undefined">
    <section class="mb-64">
      <VHeading level="1" class="mb-24">{{ question.name }}</VHeading>
      <VHtmlContent :content="question.text" class="mt-8" />
    </section>
    <section>
      <VHeading level="2" class="mb-24">Ответы</VHeading>
      <div class="flex flex-col gap-24">
        <VPost v-for="answer in answers" :key="answer.slug" :answer="answer" />
      </div>
    </section>
  </div>
  <VPreloader v-else />
</template>
