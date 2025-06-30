<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useHomeworkAnswerCreateMutation } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { useHomeworkQuestionQuery, useLessonsQuery } from '@/query';
  import { computed } from 'vue';
  import { useHomeworkBreadcrumbs } from './useHomeworkBreadcrumbs';

  interface Props {
    questionId: string;
  }

  const props = defineProps<Props>();
  const router = useRouter();

  const { breadcrumbs } = useHomeworkBreadcrumbs(() => props.questionId);

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(() => props.questionId);

  const { data: lessons, isLoading: isLessonsLoading } = useLessonsQuery(
    question.value?.breadcrumbs.module.id,
  );

  const lesson = computed(() => {
    return lessons.value?.find(
      (lesson) => lesson.id === question.value?.breadcrumbs.lesson?.id,
    );
  });

  defineEmits<{
    create: [answerId: string];
    delete: [];
  }>();

  const draft = useStorage(
    ['draft', props.questionId].filter(Boolean).join('-'),
    '',
    localStorage,
  );

  const queryClient = useQueryClient();
  const {
    mutateAsync: createAnswerMutation,
    isPending: isCreateAnswerPending,
  } = useHomeworkAnswerCreateMutation(queryClient);

  const handleCreateAnswer = async () => {
    const answer = await createAnswerMutation({
      text: draft.value,
      questionId: props.questionId,
      parentId: undefined,
    });

    router.push({
      name: 'homework',
      params: {
        questionId: props.questionId,
      },
      query: {
        answerId: answer.slug,
      },
    });
  };
</script>

<template>
  <VLoggedLayout
    v-if="!(isQuestionLoading && isLessonsLoading) && question && lesson"
    :breadcrumbs="breadcrumbs"
    :title="question.name">
    <template #pill>
      <VPillHomework v-if="lesson?.homework" :stats="lesson?.homework" />
    </template>
    <section class="flex flex-col gap-24">
      <VHtmlContent :content="question.text" />
      <VCreateAnswer
        v-model="draft"
        :is-pending="isCreateAnswerPending"
        @send="handleCreateAnswer" />
    </section>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
