<script lang="ts" setup>
  import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
  import type { LessonForUser, QuestionDetail } from '@/api/generated-api';
  import VCreateAnswer from '@/components/VCreateAnswer/VCreateAnswer.vue';
  import { useStorage } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useHomeworkAnswerCreateMutation } from '@/query';
  import VLoggedLayout from '@/layouts/VLoggedLayout/VLoggedLayout.vue';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VPill from '@/components/VPill/VPill.vue';
  import VPillItem from '@/components/VPill/VPillItem.vue';

  interface Props {
    question: QuestionDetail;
    lesson?: LessonForUser;
    breadcrumbs: Breadcrumb[];
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
  <VLoggedLayout :breadcrumbs="breadcrumbs" :title="question.name">
    <template #pill>
      <VPill>
        <VPillItem>
          {{ JSON.stringify(lesson?.homework, null, 2) }}
        </VPillItem>
      </VPill>
    </template>
    <section class="flex flex-col gap-24">
      <VHtmlContent :content="question.text" />
      <VCreateAnswer v-model="draft" @send="handleCreateAnswer" />
    </section>
  </VLoggedLayout>
</template>
