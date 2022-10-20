<script lang="ts" setup>
  import Heading from '@/components/Heading.vue';
  import Post from '@/components/Post.vue';
  import HomeworkDetails from '@/components/HomeworkDetails.vue';
  import FeedbackGuide from '@/components/FeedbackGuide.vue';
  import { onMounted } from 'vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import Preloader from '@/components/Preloader.vue';

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
      <HomeworkDetails :task="question.text" class="mb-32" />
      <Post
        :firstName="answer.author.first_name"
        :lastName="answer.author.last_name"
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
          :firstName="comment.author.first_name"
          :lastName="comment.author.last_name"
          :content="comment.text"
          :date="comment.created" />
      </div>
    </section>
  </div>
  <Preloader v-else />
</template>
