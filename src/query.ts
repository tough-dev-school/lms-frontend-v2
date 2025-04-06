import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/vue-query';
import { getStudies } from '@/api/studies';
import { getLessons, getModules } from '@/api/lms';
import { getUser, setUser, setAvatar } from '@/api/users';
import type { MaybeRefOrGetter } from 'vue';
import { computed } from 'vue';
import { toValue } from 'vue';
import type { EditableUserData } from '@/types/users';

export const studiesKeys = {
  all: () => ['studies'],
  lists: () => [...studiesKeys.all(), 'list'],
};

export const lmsKeys = {
  all: () => ['lms'],
  lessons: (moduleId?: number) => [...lmsKeys.all(), 'lessons', { moduleId }],
  modules: (courseId?: number) => [...lmsKeys.all(), 'modules', { courseId }],
};

export const userKeys = {
  all: () => ['user'],
  me: () => [...userKeys.all(), 'me'],
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
    queryFn: () => getLessons({ moduleId }),
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
    queryFn: () => getModules({ courseId }),
  };
};

export const useModulesQuery = (
  courseId: MaybeRefOrGetter<number | undefined>,
) => {
  const options = computed(() => modulesOptions(toValue(courseId)));

  return useQuery(options);
};

export const userOptions = () => {
  return {
    queryKey: userKeys.me(),
    queryFn: getUser,
  };
};

export const fetchUserQuery = (queryClient: QueryClient) => {
  return queryClient.fetchQuery(userOptions());
};

export const useUserQuery = () => {
  const options = computed(() => userOptions());

  return useQuery(options);
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditableUserData) => setUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (avatar: File | null) => setAvatar(avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
