import axios from './axios';
import type { Answer, Question } from '@/types/homework';
import type { PaginantedCollection } from '@/types/api-utility';

export const getQuestion = async (questionId: string) => {
  const url = `/api/v2/homework/questions/${questionId}/`;

  return (await axios.get(url)).data as Question;
};

export const getAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

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

export const postAnswer = async ({
  text,
  questionId,
  parentId,
}: {
  text: string;
  questionId: string;
  parentId?: string;
}) => {
  const url = '/api/v2/homework/answers/';

  const data: { text: string; question: string; parent?: string } = {
    text,
    question: questionId,
  };

  if (parentId) data.parent = parentId;

  return (await axios.post(url, data)).data;
};

export const deleteAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.delete(url);
};

export const updateAnswer = async (answerId: string, text: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.patch(url, { text });
};
