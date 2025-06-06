<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import type { QuestionDetail, AnswerTree, User } from '@/api/generated-api';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import { useHomeworkCrosschecksQuery } from '@/query';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useHomeworkAnswerCreateMutation } from '@/query';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import VPillHomework from '@/components/VPillHomework/VPillHomework.vue';
  import type { LessonForUser } from '@/api/generated-api';

  interface Props {
    question: QuestionDetail;
    answer: AnswerTree;
    user: User;
    breadcrumbs: Breadcrumb[];
    lesson?: LessonForUser;
  }

  const props = defineProps<Props>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isOwnAnswer = computed(() => {
    return props.answer.author.uuid === props.user.uuid;
  });

  const answerLink = computed(() => {
    if (props.answer.slug) {
      const url = new URL(
        `${window.location.origin}/homework/${props.question.slug}`,
      );
      url.searchParams.set('answerId', props.answer.slug);
      return url.toString();
    }
    return undefined;
  });

  const commentText = useStorage(
    ['commentText', props.answer.question, props.answer.slug]
      .filter(Boolean)
      .join('-'),
    '',
    localStorage,
  );

  const handleCreateComment = async () => {
    try {
      const answer = await createAnswerMutation({
        text: commentText.value,
        questionId: props.question.slug,
        parentId: props.answer.slug,
      });

      commentText.value = '';

      router.push({
        ...router.currentRoute.value,
        hash: `#${answer.slug}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { data: crosschecks } = useHomeworkCrosschecksQuery(
    props.answer.question,
  );

  const isSent = computed(() => {
    return crosschecks.value?.some(
      (crosscheck) =>
        crosscheck.answer.slug === props.answer.slug && crosscheck.is_checked,
    );
  });

  const completedCrosschecksCount = computed(() => {
    return (
      crosschecks.value?.filter((crosscheck) => crosscheck.is_checked).length ??
      0
    );
  });

  const showCrosscheckMessage = computed(() => {
    if (!crosschecks.value?.length) return false;
    return completedCrosschecksCount.value < 3;
  });

  const crosscheckMessage = computed(() => {
    if (completedCrosschecksCount.value === 0) {
      return 'Вы увидите ответ преподавателя и ваших однокурсников после того как отправите свою работу и прокомментируете 3 чужих домашки.';
    }
    return 'Часть ответов ваших однокурсников скрыта. Чтобы открыть их — проверьте ещё чужих домашек';
  });

  const { mutateAsync: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);

  const handleDeleteAnswer = () => {
    router.push({
      name: 'homework',
      params: {
        questionId: props.question.slug,
      },
    });
  };

  const ownAnswerHref = computed(() => {
    return (
      window.location.origin +
      router.resolve({
        name: 'homework',
        params: {
          questionId: props.question.slug,
        },
      }).fullPath
    );
  });
</script>

<template>
  <VLoggedLayout :breadcrumbs="breadcrumbs" :title="question.name">
    <template #pill>
      <VPillHomework v-if="lesson?.homework" :stats="lesson?.homework" />
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
        <VHtmlContent :content="question.text" />
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
        {{ isOwnAnswer ? 'Коментарии вашей работы' : 'Коментарии' }}
      </VHeading>
      <p v-if="showCrosscheckMessage">
        {{ crosscheckMessage }}
      </p>
      <VFeedbackGuide />
      <VCreateAnswer v-model="commentText" @send="handleCreateComment" />
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
</template>
