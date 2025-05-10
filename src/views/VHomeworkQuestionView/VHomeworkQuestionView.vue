<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import useHomework from '@/stores/homework';
  import { computed, onBeforeMount } from 'vue';
  import { storeToRefs } from 'pinia';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import VNewAnswer from '@/components/VNewAnswer/VNewAnswer.vue';
  import useUser from '@/stores/user';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useRouteParams } from '@vueuse/router';

  const homework = useHomework();
  const user = useUser();

  const questionId = useRouteParams('questionId', '', {
    transform: (value) => String(value),
  });

  const { question, answers } = storeToRefs(homework);

  const answer = computed(() => {
    return answers.value.at(-1);
  });

  const getData = async () => {
    await homework.getQuestion(questionId.value);
    await homework.getAnswers({
      questionId: questionId.value,
      authorId: user.uuid,
    });
  };

  const answerLink = computed(() => {
    return answer.value
      ? `${window.location.origin}/homework/answers/${answer.value?.slug}`
      : undefined;
  });

  onBeforeMount(async () => {
    await getData();
  });
</script>

<template>
  <VLoggedLayout :title="question?.name">
    <VHtmlContent v-if="question" :content="question.text" />
    <section>
      <VHeading tag="h2" class="mb-24">Отправить работу</VHeading>
      <div v-if="answer" class="mb-16 bg-yellow-light">
        <VHeading tag="h3" class="mb-8">
          Поделиться ссылкой на сделанную домашку
        </VHeading>
        <RouterLink
          class="link block"
          :to="{
            name: 'homework-answer',
            params: {
              answerId: answer.slug,
            },
          }"
          >{{ answerLink }}</RouterLink
        >
      </div>
      <VOwnAnswer
        v-if="question && answer"
        :answer="answer"
        :question-id="questionId"
        @update="getData" />
      <VNewAnswer v-else :question-id="questionId" @update="getData" />
    </section>
  </VLoggedLayout>
</template>
