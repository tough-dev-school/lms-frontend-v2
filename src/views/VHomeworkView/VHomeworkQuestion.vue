<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import type { QuestionDetail } from '@/api/generated-api';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useHomeworkAnswerCreateMutation } from '@/query';

  interface Props {
    question: QuestionDetail;
  }

  const props = defineProps<Props>();
  const router = useRouter();

  defineEmits<{
    create: [answerId: string];
    delete: [];
  }>();

  const draft = useStorage(
    ['draft', props.question.slug].filter(Boolean).join('-'),
    '',
    localStorage,
  );

  const queryClient = useQueryClient();
  const { mutateAsync: createAnswerMutation } =
    useHomeworkAnswerCreateMutation(queryClient);

  const handleCreateAnswer = async () => {
    const answer = await createAnswerMutation({
      text: draft.value,
      questionId: props.question.slug,
      parentId: undefined,
    });

    router.push({
      name: 'homework',
      params: {
        questionId: props.question.slug,
      },
      query: {
        answerId: answer.slug,
      },
    });
  };
</script>

<template>
  <section class="flex flex-col gap-24">
    <VHtmlContent :content="question.text" />
    <VCreateAnswer v-model="draft" @send="handleCreateAnswer" />
  </section>
</template>
