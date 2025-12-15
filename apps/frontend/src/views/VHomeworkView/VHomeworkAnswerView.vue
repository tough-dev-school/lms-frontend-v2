<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useEditorAutosave } from '@/composables/useEditorAutosave';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import {
    useHomeworkCrosschecksList,
    useHomeworkAnswersCreate,
    useHomeworkQuestionsRetrieve,
    useHomeworkAnswersRetrieve,
    useUsersMeRetrieve,
    useLmsLessonsRetrieve,
    homeworkAnswersRetrieveQueryKey,
    homeworkCrosschecksListQueryKey,
    lmsLessonsListQueryKey,
  } from '@/api/generated';
  import { computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import { useHomeworkBreadcrumbs } from './useHomeworkBreadcrumbs';
  import VLoadingView from '@/views/VLoadingView/VLoadingView.vue';
  import { getEmptyContent } from '@/utils/tiptap';
  import VMakrdownContent from '@/components/VMakrdownContent/VMakrdownContent.vue';
  import { usePopulateAnswersCache } from '@/composables/usePopulateAnswersCache';

  const props = defineProps<{
    questionId: string;
    answerId: string;
  }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { breadcrumbs } = useHomeworkBreadcrumbs(() => props.questionId);
  const { data: question, isLoading: isQuestionLoading } =
    useHomeworkQuestionsRetrieve(computed(() => props.questionId));
  const { data: answer, isLoading: isAnswerLoading } =
    useHomeworkAnswersRetrieve(computed(() => props.answerId));

  const { data: lesson, isLoading: isLessonLoading } = useLmsLessonsRetrieve(
    computed(() => question.value?.breadcrumbs.lesson?.id as number),
    {
      query: {
        enabled: () => !!question.value?.breadcrumbs.lesson?.id,
      },
    },
  );

  const { data: user, isLoading: isUserLoading } = useUsersMeRetrieve();

  const populateAnswersCache = usePopulateAnswersCache();

  watch(
    () => answer.value,
    () => {
      if (answer.value) {
        populateAnswersCache(answer.value);
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

  const { content } = useEditorAutosave([
    'commentText',
    props.questionId,
    props.answerId,
  ]);

  const handleCreateComment = async () => {
    try {
      const createdAnswer = await createAnswerMutation({
        data: {
          content: content.value,
          question: props.questionId,
          parent: props.answerId,
        },
      });

      content.value = getEmptyContent();

      router.push({
        ...router.currentRoute.value,
        hash: `#${createdAnswer.slug}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: crosschecks } = useHomeworkCrosschecksList(
    computed(() => ({ question: props.questionId })),
  );

  const isSent = computed(() => {
    return crosschecks.value?.some(
      (crosscheck) =>
        crosscheck.answer.slug === props.answerId && crosscheck.is_checked,
    );
  });

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
            question: props.questionId,
          }),
        });
        queryClient.invalidateQueries({
          queryKey: lmsLessonsListQueryKey(),
        });
      },
    },
  });

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
      return 'Вы увидите комментарии ваших однокурсников после того, как прокомментируете три домашки. Одна проверка — один открытый комментарий.';
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
    :title="question.name"
  >
    <template #pill>
      <VPillHomework
        v-if="lesson.homework && lesson.question"
        :lesson="lesson"
      />
    </template>
    <section>
      <VCrossChecks
        v-if="isOwnAnswer && crosschecks?.length"
        :crosschecks="crosschecks"
      />
    </section>
    <section class="VHomeworkAnswerView__Section">
      <VHeading tag="h2"> Отправленная работа</VHeading>
      <VExistingAnswer
        :answer-id="answer.slug"
        @after-delete="handleDeleteAnswer"
      />
    </section>
    <section class="VHomeworkAnswerView__Section -mt-16">
      <div
        v-if="isOwnAnswer"
        class="card mb-16 flex flex-col gap-8 bg-accent-green"
      >
        <VHeading tag="h3">
          Поделитесь ссылкой на свою домашку в чате учеников
        </VHeading>
        <p class="text-sub">
          В течении курса коллеги по курсу будут присылать вам обратную связь на
          вашу домашку, но если ее недостаточно или хочется больше фидбэка —
          поделитесь ссылкой в чатике курса.
        </p>
        <p class="text-sub">Так повысите вероятность, что это случится.</p>
        <div
          v-if="answerLink"
          class="select-all break-all rounded-8 bg-white/50 px-8 py-8 text-sub"
          style="font-family: monospace"
        >
          {{ answerLink }}
        </div>
      </div>
      <VDetails>
        <template #summary> Текст задания </template>
        <VMakrdownContent
          :markdown="question.markdown_text"
          :enable-lightbox="true"
          :group="question.slug"
        />
      </VDetails>
    </section>
    <section class="VHomeworkAnswerView__Section">
      <VHeading tag="h2">
        {{ isOwnAnswer ? 'Комментарии вашей работы' : 'Комментарии' }}
      </VHeading>
      <p v-if="isOwnAnswer && feedbackMessage">
        {{ feedbackMessage }}
      </p>
      <template v-if="answer.descendants">
        <VThread
          v-for="comment in answer.descendants"
          :key="comment.slug"
          :answer-id="comment.slug"
        />
      </template>
      <VFeedbackGuide
        v-if="question.course?.homework_check_recommendations"
        :guide="question.course.homework_check_recommendations"
      />

      <VCreateAnswer
        v-model="content"
        :error="error"
        :is-pending="isPending"
        @send="handleCreateComment"
      />
      <div
        v-if="isSent"
        class="card"
      >
        Ответ отправлен!
        <a
          class="link"
          :href="ownAnswerHref"
          >Вернуться к своему ответу</a
        >
      </div>
    </section>
  </VLoggedLayout>
  <VLoadingView v-else />
</template>

<style scoped>
  .VHomeworkAnswerView {
    &__Section {
      @apply flex flex-col gap-24;
    }
  }
</style>
