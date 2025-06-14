<script lang="ts" setup>
  import { watch, onMounted, onBeforeMount, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    fetchUser,
    fetchHomeworkAnswer,
    fetchHomeworkAnswers,
  } from '@/query';
  import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
  import VHomeworkQuestionView from './VHomeworkQuestionView.vue';

  const props = defineProps<{
    questionId: string;
    answerId?: string;
  }>();

  const router = useRouter();
  const route = useRoute();
  const queryClient = useQueryClient();

  const isRedirecting = ref(false);

  const handleHomeworkLogic = async () => {
    isRedirecting.value = true;
    const user = await fetchUser(queryClient);

    if (props.answerId) {
      try {
        await fetchHomeworkAnswer(queryClient, {
          answerId: props.answerId,
        });
      } catch {
        await router.replace({
          ...route,
          query: { ...route.query, answerId: undefined },
        });
      }
    } else {
      const answers = await fetchHomeworkAnswers(queryClient, {
        questionId: props.questionId,
        authorId: user.uuid,
      });

      if (answers && answers.length > 0) {
        await router.replace({
          ...route,
          query: {
            ...route.query,
            answerId: answers[0]?.slug,
          },
        });
      }
    }
    isRedirecting.value = false;
  };

  onBeforeMount(handleHomeworkLogic);

  watch([() => props.questionId, () => props.answerId], handleHomeworkLogic);
</script>

<template>
  <VLoadingView v-if="isRedirecting" />
  <component
    :is="answerId ? VHomeworkAnswerView : VHomeworkQuestionView"
    v-else
    :question-id="questionId"
    :answer-id="answerId" />
</template>
