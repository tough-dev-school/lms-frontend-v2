import type { Answer, Thread } from '@/types/homework';

import { getComments } from '@/api/homework';
import getCommentsBySlug from '@/utils/getCommentsBySlug';

const getThreads = async (answers: Answer[]) => {
  const answerIds = answers.map((answer) => answer.slug);
  const commentsData = await getComments(answerIds);
  const threads: Thread[] = answers.map((answer) => {
    return {
      ...answer,
      descendants: getCommentsBySlug(commentsData, answer.slug),
    };
  });

  return threads;
};

export default getThreads;
