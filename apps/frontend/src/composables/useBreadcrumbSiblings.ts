import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import {
  useLmsLessonsList,
  useLmsModulesList,
  usePurchasedCoursesList,
} from '@/api/generated';
import type { Breadcrumb } from '@/components/VBreadcrumbs/VBreadcrumbs.vue';

// Params match the course and module pages, so the lists usually come from cache
export const useBreadcrumbSiblings = ({
  courseId,
  moduleId,
}: {
  courseId: MaybeRefOrGetter<number | undefined>;
  moduleId?: MaybeRefOrGetter<number | undefined>;
}) => {
  const { data: coursesData } = usePurchasedCoursesList({ page_size: 100 });

  const { data: modulesData } = useLmsModulesList(
    computed(() => ({ course: toValue(courseId), page_size: 100 })),
    { query: { enabled: () => toValue(courseId) !== undefined } },
  );

  const { data: lessonsData } = useLmsLessonsList(
    computed(() => ({ module: toValue(moduleId), page_size: 1000 })),
    { query: { enabled: () => toValue(moduleId) !== undefined } },
  );

  const courses = computed<Breadcrumb[]>(() =>
    (coursesData.value?.results ?? []).map((course) => ({
      name: course.name,
      to: { name: 'course', params: { courseId: course.id } },
    })),
  );

  const modules = computed<Breadcrumb[]>(() =>
    (modulesData.value?.results ?? []).map((module) => ({
      name: module.name,
      to: {
        name: 'module',
        params: { courseId: toValue(courseId), moduleId: module.id },
      },
    })),
  );

  // Calls have no page of their own, so only materials and homeworks are listed
  const modulePages = computed<Breadcrumb[]>(() =>
    (lessonsData.value?.results ?? []).flatMap((lesson): Breadcrumb[] => {
      if (lesson.material?.title) {
        return [
          {
            name: lesson.material.title,
            to: {
              name: 'materials',
              params: { materialId: lesson.material.id },
            },
          },
        ];
      }
      if (lesson.question) {
        return [
          {
            name: lesson.question.name,
            to: {
              name: 'homework',
              params: { questionId: lesson.question.slug },
            },
          },
        ];
      }
      return [];
    }),
  );

  return { courses, modules, modulePages };
};
