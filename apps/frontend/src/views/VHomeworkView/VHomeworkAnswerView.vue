<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import {
    useHomeworkCrosschecksQuery,
    useHomeworkAnswerCreateMutation,
    useHomeworkQuestionQuery,
    useHomeworkAnswerQuery,
    useUserQuery,
    populateAnswersCacheFromDescendants,
    useLessonQuery,
  } from '@/query';
  import { computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import { useHomeworkBreadcrumbs } from './useHomeworkBreadcrumbs';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';

  const props = defineProps<{
    questionId: string;
    answerId: string;
  }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { breadcrumbs } = useHomeworkBreadcrumbs(() => props.questionId);
  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionQuery(() => props.questionId);
  const { data: answer, isLoading: isAnswerLoading } = useHomeworkAnswerQuery(
    () => props.answerId,
  );

  const { data: lesson, isLoading: isLessonLoading } = useLessonQuery(
    () => question.value?.breadcrumbs.lesson?.id,
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

  const isOwnAnswer = computed(() => {
    return answer.value?.author.uuid === user.value?.uuid;
  });

  const answerLink = computed(() => {
    if (props.answerId) {
      const url = new URL(
        `${window.location.origin}/homework/${props.questionId}`,
      );
      url.searchParams.set('answerId', props.answerId);
      return url.toString();
    }
    return undefined;
  });

  const content = useStorage(
    ['commentText', props.questionId, props.answerId].filter(Boolean).join('-'),
    '',
    localStorage,
  );

  const handleCreateComment = async () => {
    try {
      const createdAnswer = await createAnswerMutation({
        content: content.value,
        questionId: props.questionId,
        parentId: props.answerId,
      });

      content.value = '';

      router.push({
        ...router.currentRoute.value,
        hash: `#${createdAnswer.slug}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: crosschecks } = useHomeworkCrosschecksQuery(
    () => props.questionId,
  );

  const isSent = computed(() => {
    return crosschecks.value?.some(
      (crosscheck) =>
        crosscheck.answer.slug === props.answerId && crosscheck.is_checked,
    );
  });

  const {
    mutateAsync: createAnswerMutation,
    isPending: isCreateAnswerPending,
  } = useHomeworkAnswerCreateMutation(queryClient);

  const handleDeleteAnswer = () => {
    router.push({
      name: 'homework',
      params: {
        questionId: props.questionId,
      },
    });
  };

  const ownAnswerHref = computed(() => {
    return (
      window.location.origin +
      router.resolve({
        name: 'homework',
        params: {
          questionId: props.questionId,
        },
      }).fullPath
    );
  });

  const feedbackMessage = computed(() => {
    if (!crosschecks.value?.length) return;

    const completedCrosschecks = crosschecks.value.filter(
      (check) => check.is_checked,
    );

    if (completedCrosschecks.length === 0) {
      return 'Вы увидите ответ преподавателя и ваших однокурсников после того как отправите свою работу и прокомментируете 3 чужих домашки.';
    }

    if (completedCrosschecks.length < 3) {
      return 'Часть ответов ваших однокурсников скрыта. Чтобы открыть их — проверьте ещё чужих домашек';
    }

    return null;
  });
</script>

<template>
  <VLoggedLayout
    v-if="
      !(
        isQuestionLoading &&
        isAnswerLoading &&
        isLessonLoading &&
        isUserLoading
      ) &&
      question &&
      answer &&
      user &&
      lesson
    "
    :breadcrumbs="breadcrumbs"
    :title="question.name">
    <template #pill>
      <VPillHomework v-if="lesson.homework" :stats="lesson.homework" />
    </template>
    <section class="flex flex-col gap-24">
      <div v-if="isOwnAnswer" class="card mb-16 bg-accent-green">
        <VHeading tag="h3" class="mb-8">
          Поделитесь ссылкой на сделанную домашку
        </VHeading>
        <div class="block select-all">
          {{ answerLink }}
        </div>
      </div>
      <VDetails>
        <template #summary> Текст задания </template>
        <VHtmlContent :html="question.text" />
      </VDetails>
      <VExistingAnswer
        :answer-id="answer.slug"
        @after-delete="handleDeleteAnswer" />
    </section>
    <VCrossChecks
      v-if="isOwnAnswer && crosschecks?.length"
      :crosschecks="crosschecks" />
    <section class="flex flex-col gap-24">
      <VHeading tag="h2">
        {{ isOwnAnswer ? 'Комментарии вашей работы' : 'Комментарии' }}
      </VHeading>
      <p v-if="isOwnAnswer && feedbackMessage">
        {{ feedbackMessage }}
      </p>
      <VFeedbackGuide
        v-if="question.course?.homework_check_recommendations"
        :guide="question.course.homework_check_recommendations" />

      <VCreateAnswer
        v-model="content"
        :is-pending="isCreateAnswerPending"
        @send="handleCreateComment" />
      <div v-if="isSent" class="card">
        Ответ отправлен!
        <a class="link" :href="ownAnswerHref">Вернуться к своему ответу</a>
      </div>
      <template v-if="answer.descendants">
        <VThread
          v-for="comment in answer.descendants"
          :key="comment.slug"
          :answer-id="comment.slug" />
      </template>
    </section>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>
