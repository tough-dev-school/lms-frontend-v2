import { QueryClient, useMutation, useQuery } from '@tanstack/vue-query';
import type { MaybeRefOrGetter } from 'vue';
import { computed } from 'vue';
import { toValue } from 'vue';
import { api } from '@/api';
import { queryOptions } from '@tanstack/vue-query';
import type { AnswerTree } from './api/generated-api';
import htmlToMarkdown from './utils/htmlToMarkdown';
import { ContentType } from './api/generated-api';
import type { PatchedUser } from './api/generated-api';

export const baseQueryKey = () => ['base'];

export const studiesKeys = {
  all: () => [...baseQueryKey(), 'studies'],
  lists: () => [...studiesKeys.all(), 'list'],
};

export const lmsKeys = {
  all: () => [...baseQueryKey(), 'lms'],
  lessons: () => [...lmsKeys.all(), 'lessons'],
  moduleLessons: (moduleId?: number) => [...lmsKeys.lessons(), { moduleId }],
  modules: () => [...lmsKeys.all(), 'modules'],
  courseModules: (courseId?: number) => [...lmsKeys.modules(), { courseId }],
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
  questionAnswers: ({
    questionId,
    authorId,
  }: {
    questionId?: string;
    authorId?: string;
  }) => [...homeworkKeys.all(), 'answers', [questionId, authorId]],
  answer: (answerId: string) => [...homeworkKeys.all(), 'answers', answerId],
  crosschecks: (questionId: string) => [
    ...homeworkKeys.question(questionId),
    'crosschecks',
  ],
};

export const userKeys = {
  all: () => [...baseQueryKey(), 'user'],
  me: () => [...userKeys.all(), 'me'],
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
    queryKey: lmsKeys.moduleLessons(moduleId),
    queryFn: async () =>
      (await api.lmsLessonsList({ module: moduleId, page_size: 1000 })).results,
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
    queryKey: lmsKeys.courseModules(courseId),
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
    queryFn: async () => await api.materialsRetrieve(materialId),
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
    queryFn: async () => await api.homeworkQuestionsRetrieve(questionId),
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

export const fetchHomeworkQuestion = async (
  queryClient: QueryClient,
  { questionId }: { questionId: string },
) => queryClient.fetchQuery(getHomeworkQuestionQueryOptions(questionId));

export const getHomeworkAnswerQueryOptions = (answerId: string) => {
  return queryOptions({
    queryKey: homeworkKeys.answer(answerId),
    queryFn: async () => await api.homeworkAnswersRetrieve(answerId),
  });
};

export const fetchHomeworkAnswer = async (
  queryClient: QueryClient,
  { answerId }: { answerId: string },
) => queryClient.fetchQuery(getHomeworkAnswerQueryOptions(answerId));

export const populateAnswersCacheFromDescendants = (
  queryClient: QueryClient,
  rootAnswer: AnswerTree,
) => {
  const flatAnswers: AnswerTree[] = [];

  const populate = (answer: AnswerTree) => {
    flatAnswers.push(answer);

    if (answer.descendants.length) answer.descendants.forEach(populate);
  };

  populate(rootAnswer);

  flatAnswers.forEach((answer) => {
    queryClient.setQueryData(homeworkKeys.answer(answer.slug), answer);
  });
};

export const useHomeworkAnswerQuery = (answerId: MaybeRefOrGetter<string>) => {
  const options = computed(() =>
    getHomeworkAnswerQueryOptions(toValue(answerId)),
  );

  return useQuery(options);
};

export const getHomeworkAnswersQueryOptions = ({
  authorId,
  questionId,
}: {
  authorId?: string;
  questionId?: string;
}) => {
  return queryOptions({
    queryKey: homeworkKeys.questionAnswers({ questionId, authorId }),
    queryFn: async () =>
      (
        await api.homeworkAnswersList({
          question: questionId,
          author: authorId,
        })
      ).results,
  });
};

export const fetchHomeworkAnswers = async (
  queryClient: QueryClient,
  { authorId, questionId }: { authorId?: string; questionId?: string },
) =>
  queryClient.fetchQuery(
    getHomeworkAnswersQueryOptions({ authorId, questionId }),
  );

export const useHomeworkAnswersQuery = ({
  questionId,
  authorId,
}: {
  questionId: MaybeRefOrGetter<string>;
  authorId: MaybeRefOrGetter<string | undefined>;
}) => {
  const options = computed(() =>
    getHomeworkAnswersQueryOptions({
      questionId: toValue(questionId),
      authorId: toValue(authorId),
    }),
  );

  return useQuery(options);
};

export const useRemoveHomeworkReactionMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      answerId,
      reactionId,
    }: {
      answerId: string;
      reactionId: string;
    }) => await api.homeworkAnswersReactionsDestroy(answerId, reactionId),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(answerId),
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
      answerId: string;
      reaction: string;
    }) =>
      await api.homeworkAnswersReactionsCreate(answerId, {
        emoji: reaction,
      }),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(answerId),
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
    }) => {
      return await api.homeworkAnswersCreate({
        text: htmlToMarkdown(text),
        question: questionId,
        parent: parentId,
      });
    },
    onSuccess: (data, { questionId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(data.parent),
      });
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.crosschecks(questionId),
      });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.lessons(),
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
      await api.homeworkAnswersPartialUpdate(answerId, {
        text: htmlToMarkdown(text),
      }),
    onSuccess: (_, { answerId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(answerId),
      });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.lessons(),
      });
    },
  });
};

export const useHomeworkAnswerDeleteMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async ({
      answerId,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      parentId,
    }: {
      answerId: string;
      parentId: string;
    }) => await api.homeworkAnswersDestroy(answerId),
    onSuccess: (_, { parentId }) => {
      queryClient.invalidateQueries({
        queryKey: homeworkKeys.answer(parentId),
      });
      queryClient.invalidateQueries({
        queryKey: lmsKeys.lessons(),
      });
    },
  });
};

export const useHomeworkAnswerSendImageMutation = () => {
  return useMutation({
    mutationFn: async (image: File) => {
      const formData = new FormData();
      formData.append('image', image);

      // @ts-expect-error
      return await api.homeworkAnswersImageCreate(formData, {
        type: ContentType.FormData,
      });
    },
  });
};

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: userKeys.me(),
    queryFn: async () => await api.usersMeRetrieve(),
  });
};

export const fetchUser = async (queryClient: QueryClient) =>
  queryClient.fetchQuery(getUserQueryOptions());

export const useUserQuery = () => {
  const options = computed(() => getUserQueryOptions());
  return useQuery(options);
};

export const useUpdateUserMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (data: PatchedUser) => {
      return await api.usersMePartialUpdate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
  });
};

export const useUpdateUserAvatarMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (avatar: File | null) => {
      const formData = new FormData();
      if (avatar) {
        formData.append('avatar', avatar);
      } else {
        formData.append('avatar', '');
      }

      // @ts-expect-error
      return await api.usersMePartialUpdate(formData, {
        type: ContentType.FormData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
    },
  });
};
