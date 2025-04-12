import { useQuery } from '@tanstack/vue-query';
import { getStudies } from '@/api/studies';
import type { MaybeRefOrGetter } from 'vue';
import { computed } from 'vue';
import { toValue } from 'vue';
import { api } from '@/api';

export const studiesKeys = {
  all: () => ['studies'],
  lists: () => [...studiesKeys.all(), 'list'],
};

export const lmsKeys = {
  all: () => ['lms'],
  lessons: (moduleId?: number) => [...lmsKeys.all(), 'lessons', { moduleId }],
  modules: (courseId?: number) => [...lmsKeys.all(), 'modules', { courseId }],
};

const studiesOptions = () => {
  return {
    queryKey: studiesKeys.lists(),
    queryFn: getStudies,
    placeholderData: () => [],
  };
};

export const useStudiesQuery = () => {
  const options = computed(() => studiesOptions());

  return useQuery(options);
};

const lessonsOptions = (moduleId: number | undefined) => {
  return {
    queryKey: lmsKeys.lessons(moduleId),
    queryFn: async () =>
      (await api.lmsLessonsList({ module: moduleId, page_size: 100 })).results,
  };
};

export const useLessonsQuery = (
  moduleId: MaybeRefOrGetter<number | undefined>,
) => {
  const options = computed(() => lessonsOptions(toValue(moduleId)));

  return useQuery(options);
};

const modulesOptions = (courseId: number | undefined) => {
  return {
    queryKey: lmsKeys.modules(courseId),
    queryFn: async () =>
      (await api.lmsModulesList({ course: courseId, page_size: 100 })).results,
  };
};

export const useModulesQuery = (
  courseId: MaybeRefOrGetter<number | undefined>,
) => {
  const options = computed(() => modulesOptions(toValue(courseId)));

  return useQuery(options);
};
