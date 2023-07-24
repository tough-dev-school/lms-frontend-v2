import type {
  Answer,
  Comment,
  Comments,
  Question,
  Reaction,
  ReactionEmoji,
} from '@/types/homework';

import axios from '@/axios';
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
  author?: string;
  question?: string;
}

export const getAnswers = async ({
  authorId,
  questionId,
}: {
  authorId?: string;
  questionId?: string;
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
  const url = `/api/v2/homework/comments/?answer=${[...answerIds].join(',')}`;

  return (await axios.get(url)).data as Comments[];
};

export const postAnswer = async ({
  parentId,
  questionId,
  text,
}: {
  parentId?: string;
  questionId: string;
  text: string;
}) => {
  const url = '/api/v2/homework/answers/';

  const data: { parent?: string; question: string; text: string } = {
    question: questionId,
    text: htmlToMarkdown(text),
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

export const sendImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const url = `/api/v2/homework/answers/image/`;

  return (await axios.post(url, formData)).data as { image: string };
};

export const addReaction = async (
  answerId: string,
  reaction: ReactionEmoji,
) => {
  const url = `/api/v2/homework/answers/${answerId}/reactions/`;

  const data = { emoji: reaction };

  return (await axios.post(url, data)).data as Reaction;
};

export const removeReaction = async (answerId: string, reactionId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/reactions/${reactionId}/`;

  await axios.delete(url);
};
