<script lang="ts" setup>
  import Heading from '@/components/VHeading.vue';
  import Post from '@/components/VPost.vue';
  import FeedbackGuide from '@/components/VFeedbackGuide.vue';
  import { onMounted } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import Preloader from '@/components/VPreloader.vue';
  import HtmlContent from '@/components/VHtmlContent.vue';

  const homework = useHomework();
  const { question, answer } = storeToRefs(homework);
  const route = useRoute();

  onMounted(async () => {
    const { answerId } = route.params;
    await homework.getAnswer(String(answerId));
    if (!answer.value) return;
    const questionId = answer.value.question;
    await homework.getQuestion(questionId);
  });
</script>

<template>
  <div v-if="question !== undefined && answer !== undefined">
    <section class="mb-64">
      <Heading level="1" class="mb-24">{{ question.name }}</Heading>
      <details>
        <summary>Показать задание</summary>
        <HtmlContent :content="question.text" class="mt-8" />
      </details>
      <Post
        :firstName="answer.author.firstName"
        :lastName="answer.author.lastName"
        :content="answer.text"
        :date="answer.created" />
    </section>
    <section>
      <Heading level="2" class="mb-24">Обсуждение</Heading>
      <FeedbackGuide class="mb-24" />
      <div class="grid gap-24">
        <Post
          v-for="comment in answer.descendants"
          :key="comment.slug"
          :firstName="comment.author.firstName"
          :lastName="comment.author.lastName"
          :content="comment.text"
          :date="comment.created" />
      </div>
    </section>
  </div>
  <Preloader v-else />
</template>
