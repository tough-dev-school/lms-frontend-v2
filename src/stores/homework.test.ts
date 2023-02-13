import { describe, test, beforeEach, expect, vi } from 'vitest';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import useHomework, { getCommentsBySlug } from './homework';
import useToasts from './toasts';
import { faker } from '@faker-js/faker';
import {
  getQuestion,
  postAnswer,
  deleteAnswer,
  updateAnswer,
  getAnswers,
  getAnswer,
} from '@/api/homework';
import shuffle from 'lodash/shuffle';
import {
  getAnswerData,
  getAnswersData,
  getCommentsData,
  getQuestionData,
  getThreadData,
} from '@/mocks/homework';

vi.mock('@/api/homework', () => {
  return {
    getQuestion: vi.fn(),
    postAnswer: vi.fn(),
    deleteAnswer: vi.fn(),
    updateAnswer: vi.fn(),
    getAnswers: vi.fn(),
    getAnswer: vi.fn(),
  };
});

const text = faker.lorem.sentence();
const questionId = faker.datatype.uuid();
const parentId = faker.datatype.uuid();
const authorId = faker.datatype.uuid();
const answerId = faker.datatype.uuid();

describe('homework store', () => {
  let homework: ReturnType<typeof useHomework>;
  let toasts: ReturnType<typeof useToasts>;

  beforeEach(() => {
    const app = createApp({});
    const pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false });
    app.use(pinia);
    setActivePinia(pinia);

    homework = useHomework();
    toasts = useToasts();
  });

  test('homework question is initially empty', () => {
    expect(homework.question).toBe(undefined);
  });

  test('homework answers are initially empty', () => {
    expect(homework.answers).toHaveLength(0);
  });

  test('getQuestion calls api', async () => {
    await homework.getQuestion(questionId);

    expect(getQuestion).toHaveBeenCalledOnce();
    expect(getQuestion).toHaveBeenCalledWith(questionId);
  });

  test('getQuestion sets question', async () => {
    const questionData = getQuestionData();
    (getQuestion as ReturnType<typeof vi.fn>).mockResolvedValue(questionData);

    await homework.getQuestion(questionId);

    expect(homework.question).toStrictEqual(questionData);
  });

  test('getAnswers calls api', async () => {
    await homework.getAnswers({ questionId, authorId });

    expect(getAnswers).toHaveBeenCalledOnce();
    expect(getAnswers).toHaveBeenCalledWith({ questionId, authorId });
  });

  test('getAnswers sets answers', async () => {
    const answersData = getAnswersData();
    (getAnswers as ReturnType<typeof vi.fn>).mockResolvedValue(answersData);

    await homework.getAnswers({ questionId, authorId });

    expect(homework.answers).toStrictEqual(answersData);
  });

  test('getAnswerById calls api', async () => {
    await homework.getAnswerById(answerId);

    expect(getAnswer).toHaveBeenCalledOnce();
    expect(getAnswer).toHaveBeenCalledWith(answerId);
  });

  test('getAnswerById sets answers', async () => {
    const answerData = getAnswerData();
    (getAnswer as ReturnType<typeof vi.fn>).mockResolvedValue(answerData);

    await homework.getAnswerById(answerId);

    expect(homework.answers).toStrictEqual([answerData]);
  });

  test('postAnswer calls api', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(postAnswer).toHaveBeenCalledOnce();
    expect(postAnswer).toHaveBeenCalledWith({ text, questionId, parentId });
  });

  test('deleteAnswer shows toast on success', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('deleteAnswer calls api', async () => {
    await homework.deleteAnswer(answerId);

    expect(deleteAnswer).toHaveBeenCalledOnce();
    expect(deleteAnswer).toHaveBeenCalledWith(answerId);
  });

  test('deleteAnswer shows toast on success', async () => {
    await homework.deleteAnswer(answerId);

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('updateAnswer calls api', async () => {
    await homework.updateAnswer(answerId, text);

    expect(updateAnswer).toHaveBeenCalledOnce();
    expect(updateAnswer).toHaveBeenCalledWith(answerId, text);
  });

  test('updateAnswer shows toast on success', async () => {
    await homework.updateAnswer(answerId, text);

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('getCommentsBySlug returns array if nothing found', () => {
    expect(getCommentsBySlug([], faker.datatype.uuid())).toStrictEqual([]);
  });

  test('getCommentsBySlug returns array of comments', () => {
    const targetSlug = faker.datatype.uuid();
    const n = 10;

    const parent = { ...getThreadData(getAnswerData()), slug: targetSlug };

    const needed = getCommentsData(parent, n);
    const notNeeded = [...Array(10)].map(() =>
      getCommentsData(getThreadData(), 5),
    );

    const commentsData = shuffle([needed, ...notNeeded]);

    expect(
      getCommentsBySlug(commentsData, targetSlug).every(
        (comment) => comment.parent === targetSlug,
      ),
    ).toBe(true);
    expect(getCommentsBySlug(commentsData, targetSlug)).toHaveLength(n);
  });
});
