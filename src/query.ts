import { QueryClient, useMutation, useQuery } from '@tanstack/vue-query';
import type { MaybeRefOrGetter } from 'vue';
import { computed } from 'vue';
import { toValue } from 'vue';
import { api } from '@/api';
import { queryOptions } from '@tanstack/vue-query';
import type { Answer, BlockMap } from '@/types';
import type {
  AnswerCreate,
  AnswerDetailed,
  Question,
} from './api/generated-api';
import htmlToMarkdown from './utils/htmlToMarkdown';

export const baseQueryKey = () => ['base'];

export const studiesKeys = {
  all: () => [...baseQueryKey(), 'studies'],
  lists: () => [...studiesKeys.all(), 'list'],
};

export const lmsKeys = {
  all: () => [...baseQueryKey(), 'lms'],
  lessons: (moduleId?: number) => [...lmsKeys.all(), 'lessons', { moduleId }],
  modules: (courseId?: number) => [...lmsKeys.all(), 'modules', { courseId }],
};

export const materialsKeys = {
  all: () => [...baseQueryKey(), 'materials'],
  materials: (materialId: string) => [
    ...materialsKeys.all(),
    'materials',
    materialId,
  ],
};

export const homeworkKeys = {
  all: () => [...baseQueryKey(), 'homework'],
  question: (questionId: string) => [
    ...homeworkKeys.all(),
    'question',
    questionId,
  ],
  answer: (answerId: string) => [...homeworkKeys.all(), 'answer', answerId],
  answers: (questionId: string) => [
    ...homeworkKeys.all(),
    questionId,
    'answers',
  ],
  comments: (answerId: string) => [...homeworkKeys.all(), 'comments', answerId],
  crosschecks: (questionId: string) => [
    ...homeworkKeys.all(),
    'crosschecks',
    questionId,
  ],
  descendants: (answerId: string) => [
    ...homeworkKeys.all(),
    'descendants',
    answerId,
  ],
};

const studiesOptions = () => {
  return {
    queryKey: studiesKeys.lists(),
    queryFn: async () =>
      (await api.purchasedCoursesList({ page_size: 100 })).results,
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

export const fetchModules = async (
  queryClient: QueryClient,
  { courseId }: { courseId: number },
) => queryClient.fetchQuery(modulesOptions(courseId));

export const useModulesQuery = (
  courseId: MaybeRefOrGetter<number | undefined>,
) => {
  const options = computed(() => modulesOptions(toValue(courseId)));

  return useQuery(options);
};

export const getMaterialQueryOptions = (materialId: string) => {
  return queryOptions({
    queryKey: materialsKeys.materials(materialId),
    queryFn: async () =>
      (await api.notionMaterialsRetrieve(materialId)) as BlockMap,
  });
};

export const fetchMaterial = async (
  queryClient: QueryClient,
  { materialId }: { materialId: string },
) => queryClient.fetchQuery(getMaterialQueryOptions(materialId));

export const useMaterialQuery = (materialId: MaybeRefOrGetter<string>) => {
  const options = computed(() => getMaterialQueryOptions(toValue(materialId)));

  return useQuery(options);
};

export const diplomasKeys = {
  all: () => ['diplomas'],
  lists: () => [...diplomasKeys.all(), 'list'],
};

const diplomasOptions = () => {
  return {
    queryKey: diplomasKeys.lists(),
    queryFn: async () => (await api.diplomasList({ page_size: 100 })).results,
  };
};

export const useDiplomasQuery = () => {
  const options = computed(() => diplomasOptions());

  return useQuery(options);
};

export const getHomeworkQuestionQueryOptions = (questionId: string) => {
  return queryOptions({
    queryKey: homeworkKeys.question(questionId),
    queryFn: async () =>
      (await api.homeworkQuestionsRetrieve(questionId)) as Question,
  });
};

export const useHomeworkQuestionQuery = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const options = computed(() =>
    getHomeworkQuestionQueryOptions(toValue(questionId)),
  );

  return useQuery(options);
};

export const getHomeworkAnswerQueryOptions = (answerId?: string) => {
  return queryOptions({
    queryKey: homeworkKeys.answers(answerId ?? ''),
    queryFn: async () => {
      const answer = await api.homeworkAnswersRetrieve(answerId ?? '');
      const descendants: string[] = [];
      if (answer.has_descendants) {
        const descendants = await api.homeworkAnswersList({
          parent: [answerId ?? ''],
        });

        descendants.forEach((descendant) => {
          descendants.push(descendant.slug);
        });
      }

      return {
        ...answer,
        descendants,
      } as Answer;
    },
    enabled: answerId !== undefined,
  });
};

export const useHomeworkAnswerQuery = (
  answerId: MaybeRefOrGetter<string | undefined>,
) => {
  const options = computed(() =>
    getHomeworkAnswerQueryOptions(toValue(answerId)),
  );

  return useQuery(options);
};

export const getHomeworkAnswersQueryOptions = (questionId: string) => {
  return queryOptions({
    queryKey: homeworkKeys.answers(questionId),
    queryFn: async () =>
      (await api.homeworkAnswersList({ question: questionId })).results,
  });
};

export const fetchHomeworkAnswers = async (
  queryClient: QueryClient,
  { questionId }: { questionId: string },
) => queryClient.fetchQuery(getHomeworkAnswersQueryOptions(questionId));

export const useHomeworkAnswersQuery = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const options = computed(() =>
    getHomeworkAnswersQueryOptions(toValue(questionId)),
  );

  return useQuery(options);
};

export const getHomeworkCommentsQueryOptions = (
  answerId: string | undefined,
  queryClient: QueryClient,
) => {
  return queryOptions({
    queryKey: homeworkKeys.comments(answerId ?? ''),
    queryFn: async () => {
      const descendants = await api.homeworkCommentsList({
        answer: [answerId ?? ''],
      });

      descendants.forEach((descendant) => {
        queryClient.setQueryData(
          homeworkKeys.comments(descendant.slug),
          descendant,
        );
      });

      return descendants;
    },
    enabled: answerId !== undefined,
  });
};

export const useHomeworkCommentsQuery = (
  answerId: MaybeRefOrGetter<string | undefined>,
  queryClient: QueryClient,
) => {
  const options = computed(() =>
    getHomeworkCommentsQueryOptions(toValue(answerId), queryClient),
  );

  return useQuery(options);
};

export const useRemoveHomeworkReactionMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      answerId,
      reactionId,
    }: {
      answerId: MaybeRefOrGetter<string>;
      reactionId: MaybeRefOrGetter<string>;
    }) =>
      await api.homeworkAnswersReactionsDestroy(
        toValue(answerId),
        toValue(reactionId),
      ),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(toValue(answerId)),
      });
    },
  });
};

export const useAddHomeworkReactionMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      answerId,
      reaction,
    }: {
      answerId: MaybeRefOrGetter<string>;
      reaction: MaybeRefOrGetter<string>;
    }) =>
      await api.homeworkAnswersReactionsCreate(toValue(answerId), {
        emoji: toValue(reaction),
      }),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(toValue(answerId)),
      });
    },
  });
};

export const getHomeworkCrosschecksQueryOptions = (questionId: string) => {
  return queryOptions({
    queryKey: homeworkKeys.crosschecks(questionId),
    queryFn: async () =>
      await api.homeworkCrosschecksList({ question: [questionId] }),
  });
};

export const useHomeworkCrosschecksQuery = (
  questionId: MaybeRefOrGetter<string>,
) => {
  const options = computed(() =>
    getHomeworkCrosschecksQueryOptions(toValue(questionId)),
  );

  return useQuery(options);
};

export const useHomeworkAnswerCreateMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      text,
      questionId,
      parentId,
    }: {
      text: string;
      questionId: string;
      parentId?: string;
    }) =>
      await api.homeworkAnswersCreate({
        text: htmlToMarkdown(text),
        question: questionId,
        parent: parentId,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(data.slug),
      });
    },
  });
};

export const useHomeworkAnswerUpdateMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      answerId,
      text,
    }: {
      answerId: string;
      text: string;
    }) =>
      await api.homeworkAnswersUpdate(answerId, { text: htmlToMarkdown(text) }),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(answerId),
      });
    },
  });
};

export const useHomeworkAnswerDeleteMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({ answerId }: { answerId: string }) =>
      await api.homeworkAnswersDestroy(answerId),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(answerId),
      });
    },
  });
};
