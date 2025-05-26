<script lang="ts" setup>
  import VHeading from '@/components/VHeading/VHeading.vue';
  import VThread from '@/components/VThread/VThread.vue';
  import VFeedbackGuide from '@/components/VFeedbackGuide/VFeedbackGuide.vue';
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
  import VDetails from '@/components/VDetails/VDetails.vue';
  import type { QuestionDetail, AnswerTree } from '@/api/generated-api';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import VExistingAnswer from '@/components/VExistingAnswer';
  import { useHomeworkCrosschecksQuery } from '@/query';
  import { computed } from 'vue';
  import useUser from '@/stores/user';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useHomeworkAnswerCreateMutation } from '@/query';

  interface Props {
    question: QuestionDetail;
    answer: AnswerTree;
  }

  const props = defineProps<Props>();
  const router = useRouter();
  const user = useUser();
  const queryClient = useQueryClient();

  const isOwnAnswer = computed(() => {
    return props.answer.author.uuid === user.uuid;
  });

  const answerLink = computed(() => {
    if (props.answer.slug) {
      const url = new URL(
        `${window.location.href}/homework/${props.question.slug}`,
      );
      url.searchParams.set('answerId', props.answer.slug);
      return url.toString();
    }
    return undefined;
  });

  const emit = defineEmits<{
    comment: [text: string];
    delete: [];
  }>();

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
</script>

<template>
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

  <section class="flex flex-col gap-24">
    <VHeading tag="h2">{{
      isOwnAnswer ? 'Коментарии вашей работы' : 'Коментарии'
    }}</VHeading>
    <VCrossChecks
      v-if="isOwnAnswer && crosschecks"
      :crosschecks="crosschecks" />
    <VFeedbackGuide />
    <VCreateAnswer v-model="commentText" @send="handleCreateComment" />
    <template v-if="answer.descendants">
      <VThread
        v-for="comment in answer.descendants"
        :key="comment.slug"
        :answer-id="comment.slug" />
    </template>
  </section>
</template>
