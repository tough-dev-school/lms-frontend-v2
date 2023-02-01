import axios from '@/axios';
import type { Answer, Comments, Question } from '@/types/homework';
import htmlToMarkdown from '@/utils/htmlToMarkdown';

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

  return (
    await axios.get(url, { params: { ...params, disable_pagination: true } })
  ).data as Answer[];
};

export const getComments = async (answerIds: string[]) => {
  const url = `/api/v2/homework/comments/?answer=` + [...answerIds].join(',');

  return (await axios.get(url)).data as Comments[];
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
    text: htmlToMarkdown(text),
    question: questionId,
  };

  if (parentId) data.parent = parentId;

  return (await axios.post(url, data)).data as Answer | Comment;
};

export const deleteAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.delete(url);
};

export const updateAnswer = async (answerId: string, text: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.patch(url, { text: htmlToMarkdown(text) });
};
