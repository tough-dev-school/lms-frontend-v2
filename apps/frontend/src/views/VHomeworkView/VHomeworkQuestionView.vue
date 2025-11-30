<script lang="ts" setup>
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useEditorAutosave } from '@/composables/useEditorAutosave';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import {
    useHomeworkAnswersCreate,
    useHomeworkQuestionsRetrieve,
    useLmsLessonsRetrieve,
    homeworkAnswersRetrieveQueryKey,
    homeworkCrosschecksListQueryKey,
    lmsLessonsListQueryKey,
  } from '@/api/generated/hooks';
  import { computed } from 'vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { useHomeworkBreadcrumbs } from './useHomeworkBreadcrumbs';
  import VMakrdownContent from '@/components/VMakrdownContent/VMakrdownContent.vue';

  interface Props {
    questionId: string;
  }

  const props = defineProps<Props>();
  const router = useRouter();

  const { breadcrumbs } = useHomeworkBreadcrumbs(() => props.questionId);

  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionsRetrieve(computed(() => props.questionId));

  const { data: lesson, isLoading: isLessonLoading } = useLmsLessonsRetrieve(
    computed(() => question.value?.breadcrumbs.lesson?.id),
  );

  const { content } = useEditorAutosave(['draft', props.questionId]);

  const queryClient = useQueryClient();
  const {
    mutateAsync: createAnswerMutation,
    isPending,
    error,
  } = useHomeworkAnswersCreate({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: homeworkAnswersRetrieveQueryKey(data.parent),
        });
        queryClient.invalidateQueries({
          queryKey: homeworkCrosschecksListQueryKey({
            question: [props.questionId],
          }),
        });
        queryClient.invalidateQueries({
          queryKey: lmsLessonsListQueryKey(),
        });
      },
    },
  });

  const handleCreateAnswer = async () => {
    const answer = await createAnswerMutation({
      data: {
        content: content.value,
        question: props.questionId,
        parent: undefined,
      },
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
    v-if="!(isQuestionLoading && isLessonLoading) && question && lesson"
    :breadcrumbs="breadcrumbs"
    :title="question.name"
  >
    <template #pill>
      <VPillHomework
        v-if="lesson?.homework"
        :stats="lesson?.homework"
      />
    </template>
    <section class="flex flex-col gap-24">
      <VMakrdownContent :markdown="question.markdown_text" />
      <VCreateAnswer
        v-model="content"
        :is-pending="isPending"
        :error="error"
        @send="handleCreateAnswer"
      />
    </section>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
