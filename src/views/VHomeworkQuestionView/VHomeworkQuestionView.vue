<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import useHomework from '@/stores/homework';
  import { computed, onBeforeMount } from 'vue';
  import { storeToRefs } from 'pinia';
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VOwnAnswer from '@/components/VOwnAnswer/VOwnAnswer.vue';
  import useUser from '@/stores/user';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import { useRouteParams } from '@vueuse/router';
  import { useRouter } from 'vue-router';

  const router = useRouter();
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

  const handleUpdate = async () => {
    await getData();

    router.push({
      name: 'homework-answer',
      params: {
        answerId: answer.value?.slug,
      },
    });
  };

  onBeforeMount(async () => {
    await getData();
  });
</script>

<template>
  <VLoggedLayout :title="question?.name">
    <VHtmlContent v-if="question" :content="question.text" />
    <section>
      <VHeading tag="h2" class="mb-24">Отправить работу</VHeading>
      <VOwnAnswer
        :answer="answer"
        :question-id="questionId"
        @update="handleUpdate" />
    </section>
  </VLoggedLayout>
</template>
