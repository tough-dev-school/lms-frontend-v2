<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent.vue';
  import useHomework from '@/stores/homework';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, ref } from 'vue';
  import type { Ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import VHeading from '@/components/VHeading.vue';
  import VPreloader from '@/components/VPreloader.vue';
  import VOwnAnswer from '@/components/VOwnAnswer.vue';
  import VNewAnswer from '@/components/VNewAnswer.vue';
  import VCard from '@/components/VCard.vue';
  import useUser from '@/stores/user';

  const route = useRoute();
  const homework = useHomework();
  const user = useUser();

  const { question, answers } = storeToRefs(homework);
  const questionId: Ref<string | undefined> = ref(undefined);

  const answer = computed(() => {
    return answers.value.at(-1);
  });

  const getData = async () => {
    questionId.value = String(route.params.questionId);
    await homework.getQuestion(questionId.value);
    await homework.getAnswers({
      questionId: questionId.value,
      authorId: user.uuid,
    });
  };

  onMounted(async () => {
    await getData();
  });
</script>

<template>
  <div v-if="question !== undefined && questionId">
    <VCard class="mb-64">
      <VHeading tag="h1" class="mb-24">{{ question.name }}</VHeading>
      <VHtmlContent :content="question.text" />
    </VCard>
    <section>
      <VHeading tag="h2" class="mb-24">Ответ</VHeading>
      <VOwnAnswer
        :answer="answer"
        v-if="answer"
        @update="getData"
        :questionId="questionId"
        :showGoToAnswer="true" />
      <VNewAnswer v-else @update="getData" :questionId="questionId" />
    </section>
  </div>
  <VPreloader v-else />
</template>
