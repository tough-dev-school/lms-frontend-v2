import { describe, test, beforeEach, expect, vi } from 'vitest';
import { createApp } from 'vue';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import useHomework from './homework';
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
import {
  getAnswerData,
  getAnswersData,
  getQuestionData,
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

  test('expect homework question to be initially undefined', () => {
    expect(homework.question).toBe(undefined);
  });

  test('expect homework answers to be initially undefined', () => {
    expect(homework.answers).toHaveLength(0);
  });

  test('expect getQuestion to call api', async () => {
    await homework.getQuestion(questionId);

    expect(getQuestion).toHaveBeenCalledOnce();
    expect(getQuestion).toHaveBeenCalledWith(questionId);
  });
  test('expect getQuestion to set question', async () => {
    const questionData = getQuestionData();
    (getQuestion as ReturnType<typeof vi.fn>).mockResolvedValue(questionData);

    await homework.getQuestion(questionId);

    expect(homework.question).toStrictEqual(questionData);
  });

  test('expect getAnswers to call api', async () => {
    await homework.getAnswers({ questionId, authorId });

    expect(getAnswers).toHaveBeenCalledOnce();
    expect(getAnswers).toHaveBeenCalledWith({ questionId, authorId });
  });
  test('expect getAnswers to set answers', async () => {
    const answersData = getAnswersData();
    (getAnswers as ReturnType<typeof vi.fn>).mockResolvedValue(answersData);

    await homework.getAnswers({ questionId, authorId });

    expect(homework.answers).toStrictEqual(answersData);
  });

  test('expect getAnswerById to call api', async () => {
    await homework.getAnswerById(answerId);

    expect(getAnswer).toHaveBeenCalledOnce();
    expect(getAnswer).toHaveBeenCalledWith(answerId);
  });
  test('expect getAnswerById to set answers', async () => {
    const answerData = getAnswerData();
    (getAnswer as ReturnType<typeof vi.fn>).mockResolvedValue(answerData);

    await homework.getAnswerById(answerId);

    expect(homework.answers).toStrictEqual([answerData]);
  });

  test('expect postAnswer to call api', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(postAnswer).toHaveBeenCalledOnce();
    expect(postAnswer).toHaveBeenCalledWith({ text, questionId, parentId });
  });
  test('expect deleteAnswer to call toast on success', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('expect deleteAnswer to call api', async () => {
    await homework.deleteAnswer(answerId);

    expect(deleteAnswer).toHaveBeenCalledOnce();
    expect(deleteAnswer).toHaveBeenCalledWith(answerId);
  });
  test('expect deleteAnswer to call toast on success', async () => {
    await homework.deleteAnswer(answerId);

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('expect updateAnswer to call api', async () => {
    await homework.updateAnswer(answerId, text);

    expect(updateAnswer).toHaveBeenCalledOnce();
    expect(updateAnswer).toHaveBeenCalledWith(answerId, text);
  });
  test('expect updateAnswer to call toast on success', async () => {
    await homework.updateAnswer(answerId, text);

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });
});
