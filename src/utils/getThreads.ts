import getCommentsBySlug from '@/utils/getCommentsBySlug';
import { getComments } from '@/api/homework';
import type { Answer, Thread } from '@/types/homework';

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
