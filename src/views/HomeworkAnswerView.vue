<script lang="ts" setup>
  import Heading from '@/components/Heading.vue';
  import Post from '@/components/Post.vue';
  import FeedbackGuide from '@/components/FeedbackGuide.vue';
  import { onMounted } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import Preloader from '@/components/Preloader.vue';
  import HtmlContent from '@/components/HtmlContent.vue';

  const homework = useHomework();
  const { question, answer } = storeToRefs(homework);
  const route = useRoute();

  onMounted(async () => {
    await homework.getData(String(route.params.id));
  });
</script>

<template>
  <div v-if="question !== undefined && answer !== undefined">
    <section>
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
    <section class="mt-64">
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
