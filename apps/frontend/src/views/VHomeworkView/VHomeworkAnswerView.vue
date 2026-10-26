<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import VExistingAnswer from '@/components/VExistingAnswer/VExistingAnswer.vue';
  import { useEditorAutosave } from '@/composables/useEditorAutosave';
  import type {
    AnswerTree,
    CrossCheck,
    Lesson,
    QuestionDetail,
  } from '@/api/generated';
  import { computed } from 'vue';
  import { Link, useForm, usePage } from '@inertiajs/vue3';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import VMakrdownContent from '@/components/VMakrdownContent/VMakrdownContent.vue';
  import { useI18n } from 'vue-i18n';
  import { urls } from '@/urls';
  import { getHomeworkBreadcrumbs } from './homeworkBreadcrumbs';
  import { useScrollToCreatedAnswer } from './useScrollToCreatedAnswer';

  const props = defineProps<{
    questionId: string;
    question: QuestionDetail;
    answer: AnswerTree;
    lesson: Lesson | null;
    crosschecks: CrossCheck[];
  }>();

  const { t } = useI18n();
  const page = usePage();

  useScrollToCreatedAnswer();

  const breadcrumbs = computed(() =>
    getHomeworkBreadcrumbs(props.question, t('common.myCourses')),
  );

  const isOwnAnswer = computed(() => {
    return props.answer.author.uuid === page.props.user?.uuid;
  });

  const answerLink = computed(
    () =>
      `${page.props.origin}${urls.homework(props.questionId, props.answer.slug)}`,
  );

  const { content, clear } = useEditorAutosave([
    'commentText',
    props.questionId,
    props.answer.slug,
  ]);

  const form = useForm({});

  const handleCreateComment = () => {
    form
      .transform(() => ({ content: content.value, parent: props.answer.slug }))
      .post(`/homework/${props.questionId}/answers`, {
        preserveScroll: true,
        onSuccess: clear,
      });
  };

  const isSent = computed(() => {
    return props.crosschecks.some(
      (crosscheck) =>
        crosscheck.answer.slug === props.answer.slug && crosscheck.is_checked,
    );
  });

  const feedbackMessage = computed(() => {
    if (!props.crosschecks.length) return;

    const completedCrosschecks = props.crosschecks.filter(
      (check) => check.is_checked,
    );

    if (completedCrosschecks.length === 0) {
      return t('homework.commentsLocked');
    }

    if (completedCrosschecks.length < 3) {
      return t('homework.commentsPartiallyHidden');
    }

    return null;
  });
</script>

<template>
  <VLoggedLayout
    :breadcrumbs="breadcrumbs"
    :title="question.name"
  >
    <template #pill>
      <VPillHomework
        v-if="lesson?.homework && lesson.question"
        :lesson="lesson"
      />
    </template>
    <section v-if="isOwnAnswer && crosschecks.length">
      <VCrossChecks :crosschecks="crosschecks" />
    </section>
    <section class="VHomeworkAnswerView__Section">
      <VHeading tag="h2">{{ t('homework.sentWork') }}</VHeading>
      <VExistingAnswer :answer="answer" />
    </section>
    <section class="VHomeworkAnswerView__Section -mt-16">
      <div
        v-if="isOwnAnswer"
        class="card mb-16 flex flex-col gap-8 bg-accent-green"
      >
        <VHeading tag="h3">
          {{ t('homework.shareTitle') }}
        </VHeading>
        <p class="text-sub">
          {{ t('homework.shareText') }}
        </p>
        <p class="text-sub">{{ t('homework.shareHint') }}</p>
        <div
          class="select-all break-all rounded-8 bg-white/50 px-8 py-8 text-sub"
          style="font-family: monospace"
          data-testid="answer-link"
        >
          {{ answerLink }}
        </div>
      </div>
      <VDetails>
        <template #summary> {{ t('homework.taskText') }} </template>
        <VMakrdownContent
          :markdown="question.markdown_text"
          :enable-lightbox="true"
          :group="question.slug"
        />
      </VDetails>
    </section>
    <section class="VHomeworkAnswerView__Section">
      <VHeading tag="h2">
        {{
          isOwnAnswer ? t('homework.ownAnswerComments') : t('homework.comments')
        }}
      </VHeading>
      <p v-if="isOwnAnswer && feedbackMessage">
        {{ feedbackMessage }}
      </p>
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :answer="comment"
      />
      <VFeedbackGuide
        v-if="question.course?.homework_check_recommendations"
        :guide="question.course.homework_check_recommendations"
      />

      <VCreateAnswer
        v-model="content"
        :error="form.errors"
        :is-pending="form.processing"
        @send="handleCreateComment"
      />
      <div
        v-if="isSent"
        class="card"
      >
        {{ t('homework.answerSent') }}
        <Link
          class="link"
          :href="urls.homework(questionId)"
        >
          {{ t('homework.backToOwnAnswer') }}
        </Link>
      </div>
    </section>
  </VLoggedLayout>
</template>

<style scoped>
  .VHomeworkAnswerView {
    &__Section {
      @apply flex flex-col gap-24;
    }
  }
</style>
