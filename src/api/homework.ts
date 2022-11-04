import axios from './axios';
import type { Answer, Question } from '@/types/homework';
import type { PaginantedCollection } from '@/types/api-utility';

export const getQuestion = async (id: string) => {
  const url = `/api/v2/homework/questions/${id}/`;

  return (await axios.get(url)).data as Question;
};

export const getAnswer = async (id: string) => {
  const url = `/api/v2/homework/answers/${id}/`;

  return (await axios.get(url)).data as Answer;
};

interface getAnswersParams {
  question?: string;
  author?: string;
}

export const getAnswers = async ({
  questionId,
  authorId,
}: {
  questionId?: string;
  authorId?: string;
} = {}) => {
  const url = '/api/v2/homework/answers/';

  const params: getAnswersParams = {};

  if (questionId) {
    params.question = questionId;
  }

  if (authorId) {
    params.author = authorId;
  }

  return (await axios.get(url, { params }))
    .data as PaginantedCollection<Answer>;
};

export const postAnswer = async (
  text: string,
  questionId: string,
  parentId: string | null,
) => {
  const url = '/api/v2/homework/answers/';

  return (
    await axios.post(url, { text, question: questionId, parent: parentId })
  ).data;
};

export const deleteAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.delete(url);
};

export const updateAnswer = async (answerId: string, text: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.patch(url, { text });
};
