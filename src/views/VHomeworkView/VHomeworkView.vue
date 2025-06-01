<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouteQuery, useRouteParams } from '@vueuse/router';
  import { fetchHomeworkQuestion } from '@/query';
  import { useQueryClient } from '@tanstack/vue-query';
  import { useRoute } from 'vue-router';
  import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
  import VHomeworkAnswerProvider from './VHomeworkAnswerProvider.vue';
  import VHomeworkQuestionProvider from './VHomeworkQuestionProvider.vue';

  const answerId = useRouteQuery<string | undefined>('answerId');
  const questionId = useRouteParams<string>('questionId');

  const route = useRoute();

  const queryClient = useQueryClient();

  const breadcrumbs = ref<Breadcrumb[]>([]);

  onMounted(async () => {
    const result: Breadcrumb[] = [{ name: 'Мои курсы', to: { name: 'home' } }];

    const question = await fetchHomeworkQuestion(queryClient, {
      questionId: route.params.questionId as string,
    });

    if (!question) return undefined;

    if (question.breadcrumbs.course) {
      result.push({
        name: question.breadcrumbs.course.name,
        to: {
          name: 'modules',
          params: {
            courseId: question.breadcrumbs.course.id,
          },
        },
      });
    } else {
      return undefined;
    }

    if (question.breadcrumbs.module) {
      result.push({
        name: question.breadcrumbs.module.name,
        to: {
          name: 'lessons',
          params: {
            courseId: question.breadcrumbs.course.id,
            moduleId: question.breadcrumbs.module.id,
          },
        },
      });
    } else {
      return undefined;
    }

    result.push({
      name: question.name,
      to: {
        name: 'homework',
        params: {
          questionId: questionId.value,
        },
      },
    });

    return result;
  });
</script>

<template>
  <VHomeworkAnswerProvider
    v-if="answerId"
    :breadcrumbs="breadcrumbs"
    :question-id="questionId"
    :answer-id="answerId" />
  <VHomeworkQuestionProvider
    v-else
    :breadcrumbs="breadcrumbs"
    :question-id="questionId" />
</template>
