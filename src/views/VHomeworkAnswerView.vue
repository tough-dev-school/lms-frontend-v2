<script lang="ts" setup>
  import VHeading from '@/components/VHeading.vue';
  import VPost from '@/components/VPost.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide.vue';
  import { computed, onMounted } from 'vue';
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
    const { answerId } = route.params;
    await homework.getAnswerById(String(answerId));
    if (!answer.value) return;
    const questionId = answer.value.question;
    await homework.getQuestion(questionId);
  };

  onMounted(async () => {
    await getData();
  });
</script>

<template>
  <div v-if="question !== undefined && answer !== undefined">
    <section class="mb-64">
      <VHeading level="1" class="mb-24">{{ question.name }}</VHeading>
      <details>
        <summary>Показать задание</summary>
        <VHtmlContent :content="question.text" class="mt-8" />
      </details>
      <VPost
        :firstName="answer.author.firstName"
        :lastName="answer.author.lastName"
        :content="answer.text"
        :date="answer.created" />
    </section>
    <section>
      <VHeading level="2" class="mb-24">Обсуждение</VHeading>
      <VFeedbackGuide class="mb-24" />
      <div class="grid gap-24">
        <VPost
          v-for="comment in answer.descendants"
          :key="comment.slug"
          :firstName="comment.author.firstName"
          :lastName="comment.author.lastName"
          :content="comment.text"
          :date="comment.created" />
      </div>
    </section>
  </div>
  <VPreloader v-else />
</template>
