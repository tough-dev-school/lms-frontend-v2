import { homeworkQuestionsRetrieveQueryOptions } from '@/api/generated';
import { onMounted, ref, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';

export const useHomeworkBreadcrumbs = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const queryClient = useQueryClient();
  const { t } = useI18n();

  const breadcrumbs = ref<Breadcrumb[]>();

  onMounted(async () => {
    const result: Breadcrumb[] = [
      { name: t('common.myCourses'), to: { name: 'courses' } },
    ];

    const question = await queryClient.fetchQuery(
      homeworkQuestionsRetrieveQueryOptions(toValue(questionId)),
    );

    if (!question) return undefined;

    if (question.breadcrumbs.course) {
      result.push({
        name: question.breadcrumbs.course.name,
        to: {
          name: 'course',
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
          name: 'module',
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
          questionId: toValue(questionId),
        },
      },
    });

    breadcrumbs.value = result;
  });

  return {
    breadcrumbs,
  };
};
