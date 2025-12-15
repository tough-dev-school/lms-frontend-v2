import { useQueryClient } from '@tanstack/vue-query';
import { homeworkAnswersRetrieveQueryKey } from '@/api/generated';
import type { Answer, AnswerTree } from '@/api/generated';

export const usePopulateAnswersCache = () => {
  const queryClient = useQueryClient();

  return (rootAnswer: AnswerTree) => {
    const flatAnswers: (Answer | AnswerTree)[] = [];

    const populate = (a: Answer | AnswerTree) => {
      flatAnswers.push(a);

      if ('descendants' in a && a.descendants.length) {
        a.descendants.forEach((v) => populate(v));
      }
    };

    populate(rootAnswer);

    flatAnswers.forEach((a) => {
      queryClient.setQueryData(homeworkAnswersRetrieveQueryKey(a.slug), a);
    });
  };
};
