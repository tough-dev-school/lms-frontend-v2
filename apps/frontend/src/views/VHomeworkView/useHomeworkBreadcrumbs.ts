import { fetchHomeworkQuestion } from '@/query';
import { onMounted, ref, toValue  } from 'vue';
import type {MaybeRefOrGetter} from 'vue';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';
import { useQueryClient } from '@tanstack/vue-query';

export const useHomeworkBreadcrumbs = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const queryClient = useQueryClient();

  const breadcrumbs = ref<Breadcrumb[]>();

  onMounted(async () => {
    const result: Breadcrumb[] = [{ name: 'Мои курсы', to: { name: 'home' } }];

    const question = await fetchHomeworkQuestion(queryClient, {
      questionId: toValue(questionId),
    });

    if (!question) {return;}

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
      return;
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
      return;
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
