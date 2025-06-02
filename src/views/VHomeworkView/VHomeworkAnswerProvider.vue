<script lang="ts" setup>
  import VHomeworkAnswer from './VHomeworkAnswer.vue';
  import { useHomeworkQuestionQuery } from '@/query';
  import { useHomeworkAnswerQuery } from '@/query';
  import { useUserQuery } from '@/query';
  import { watch } from 'vue';
  import { useQueryClient } from '@tanstack/vue-query';
  import { populateAnswersCacheFromDescendants } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';

  const queryClient = useQueryClient();

  const props = defineProps<{
    questionId: string;
    answerId: string;
    breadcrumbs: Breadcrumb[];
  }>();

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(props.questionId);
  const { data: answer, isLoading: isAnswerLoading } = useHomeworkAnswerQuery(
    props.answerId,
  );
  const { data: user, isLoading: isUserLoading } = useUserQuery();

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCacheFromDescendants(queryClient, answer.value);
      }
    },
  );
</script>

<template>
  <VLoggedLayout
    :is-loading="isQuestionLoading || isAnswerLoading || isUserLoading">
    <template v-if="question && answer && user">
      <VHomeworkAnswer :question="question" :answer="answer" :user="user" />
    </template>
  </VLoggedLayout>
</template>
