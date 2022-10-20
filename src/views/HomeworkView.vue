<script lang="ts" setup>
  import Heading from '@/components/Heading.vue';
  import Post from '@/components/Post.vue';
  import HomeworkDetails from '@/components/HomeworkDetails.vue';
  import FeedbackGuide from '@/components/FeedbackGuide.vue';
  import { onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { getQuestion, getAnswers } from '@/api/homework';
  import { useRoute } from 'vue-router';
  import type { Answer } from '@/types/homework';

  const route = useRoute();
  const taskName = ref('');
  const taskText = ref('');
  const comments: Ref<Answer[]> = ref([]);

  const authorFirstName = ref('');
  const authorLastName = ref('');
  const answer = ref('');
  const answerCreated = ref('');

  onMounted(async () => {
    const answersData = await getAnswers(String(route.params.id));
    comments.value = answersData.descendants;
    authorFirstName.value = answersData.author.first_name;
    authorLastName.value = answersData.author.last_name;
    answer.value = answersData.text;
    answerCreated.value = answersData.created;

    const questionData = await getQuestion(answersData.question);
    taskName.value = questionData.name;
    taskText.value = questionData.text;
  });
</script>

<template>
  <section>
    <Heading level="1" class="mb-24">{{ taskName }}</Heading>
    <HomeworkDetails :task="taskText" class="mb-32" />
    <Post
      :firstName="authorFirstName"
      :lastName="authorLastName"
      :content="answer"
      :date="answerCreated" />
  </section>
  <section class="mt-64">
    <Heading level="2" class="mb-24">Обсуждение</Heading>
    <FeedbackGuide class="mb-24" />
    <div class="grid gap-24">
      <Post
        v-for="comment in comments"
        :key="comment.slug"
        :firstName="comment.author.first_name"
        :lastName="comment.author.last_name"
        :content="comment.text"
        :date="comment.created" />
    </div>
  </section>
</template>
