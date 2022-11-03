<script lang="ts" setup>
  import HtmlContent from '@/components/HtmlContent.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Heading from '@/components/Heading.vue';
  import Preloader from '@/components/Preloader.vue';

  const route = useRoute();
  const homework = useHomework();

  const { question } = storeToRefs(homework);
  const questionId = ref('');

  onMounted(async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
  });
</script>

<template>
  <div v-if="question !== undefined">
    <section class="mb-64">
      <Heading level="1" class="mb-24">{{ question.name }}</Heading>
      <HtmlContent :content="question.text" />
    </section>
  </div>
  <Preloader v-else />
</template>
