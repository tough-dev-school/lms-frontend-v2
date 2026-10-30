import { homeworkQuestionsRetrieveQueryOptions } from '@/api/generated';
import { computed, onMounted, ref, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useI18n } from 'vue-i18n';
import { useBreadcrumbSiblings } from '@/composables/useBreadcrumbSiblings';

export const useHomeworkBreadcrumbs = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const queryClient = useQueryClient();
  const { t } = useI18n();

  const baseBreadcrumbs = ref<Breadcrumb[]>();
  const courseId = ref<number>();
  const moduleId = ref<number>();

  const { courses, modules, modulePages } = useBreadcrumbSiblings({
    courseId,
    moduleId,
  });

  onMounted(async () => {
    const result: Breadcrumb[] = [
      { name: t('common.myCourses'), label: '~', to: { name: 'courses' } },
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

    courseId.value = question.breadcrumbs.course.id;
    moduleId.value = question.breadcrumbs.module.id;
    baseBreadcrumbs.value = result;
  });

  // Sibling lists load after the crumbs, so they are attached separately
  const breadcrumbs = computed(() => {
    if (!baseBreadcrumbs.value) return undefined;

    const [myCourses, course, module, question] = baseBreadcrumbs.value;
    return [
      myCourses,
      { ...course, siblings: courses.value },
      { ...module, siblings: modules.value },
      { ...question, siblings: modulePages.value },
    ];
  });

  return {
    breadcrumbs,
  };
};
