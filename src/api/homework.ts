import axios from './index';
import type {
  Answer,
  Comments,
  Question,
  Comment,
  Reaction,
  ReactionEmoji,
  CrossCheck,
} from '@/types/homework';
import htmlToMarkdown from '@/utils/htmlToMarkdown';

/**
 * @deprecated use api/index.ts instead
 */
export const getQuestion = async (questionId: string) => {
  const url = `/api/v2/homework/questions/${questionId}/`;

  return (await axios.get(url)).data as Question;
};

/**
 * @deprecated use api/index.ts instead
 */
export const getAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  return (await axios.get(url)).data as Answer;
};

interface getAnswersParams {
  question?: string;
  author?: string;
}

/**
 * @deprecated use api/index.ts instead
 */
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

/**
 * @deprecated use api/index.ts instead
 */
export const getComments = async (answerIds: string[]) => {
  const url = `/api/v2/homework/comments/?answer=${[...answerIds].join(',')}`;

  return (await axios.get(url)).data as Comments[];
};

/**
 * @deprecated use api/index.ts instead
 */
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

/**
 * @deprecated use api/index.ts instead
 */
export const deleteAnswer = async (answerId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  await axios.delete(url);
};

/**
 * @deprecated use api/index.ts instead
 */
export const updateAnswer = async (answerId: string, text: string) => {
  const url = `/api/v2/homework/answers/${answerId}/`;

  return (await axios.patch(url, { text: htmlToMarkdown(text) })).data as
    | Answer
    | Comment;
};

/**
 * @deprecated use api/index.ts instead
 */
export const sendImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const url = `/api/v2/homework/answers/image/`;

  return (await axios.post(url, formData)).data as { image: string };
};

/**
 * @deprecated use api/index.ts instead
 */
export const addReaction = async ({
  answerId,
  emoji,
  slug,
}: {
  answerId: string;
  emoji: ReactionEmoji;
  slug?: string;
}) => {
  const url = `/api/v2/homework/answers/${answerId}/reactions/`;

  const data: { emoji: ReactionEmoji; slug?: string } = { emoji };

  if (slug) data.slug = slug;

  return (await axios.post(url, data)).data as Reaction;
};

/**
 * @deprecated use api/index.ts instead
 */
export const removeReaction = async (answerId: string, reactionId: string) => {
  const url = `/api/v2/homework/answers/${answerId}/reactions/${reactionId}/`;

  await axios.delete(url);
};

/**
 * @deprecated use api/index.ts instead
 */
export const getCrossChecks = async (questionId: string) => {
  const url = `/api/v2/homework/crosschecks/?question=${questionId}`;

  return (await axios.get(url)).data as CrossCheck[];
};
