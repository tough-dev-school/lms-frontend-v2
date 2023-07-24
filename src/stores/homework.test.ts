import {
  deleteAnswer,
  getAnswer,
  getAnswers,
  getQuestion,
  postAnswer,
  updateAnswer,
} from '@/api/homework';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockComment } from '@/mocks/mockComment';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockThread } from '@/mocks/mockThread';
import getThreads from '@/utils/getThreads';
import { faker } from '@faker-js/faker';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { createApp } from 'vue';

import useHomework from './homework';
import useToasts from './toasts';

vi.mock('@/api/homework', () => {
  return {
    deleteAnswer: vi.fn(),
    getAnswer: vi.fn(),
    getAnswers: vi.fn(),
    getQuestion: vi.fn(),
    postAnswer: vi.fn(),
    updateAnswer: vi.fn(),
  };
});
vi.mock('@/utils/getThreads');

const text = faker.lorem.sentence();
const questionId = faker.string.uuid();
const parentId = faker.string.uuid();
const authorId = faker.string.uuid();
const answerId = faker.string.uuid();

const answerData = mockAnswer();
const answersData = faker.helpers.multiple(mockAnswer, { count: 3 });
const threadsData = mockThread();
const postData = mockComment({ ...mockThread(), parent: parentId });
const questionData = mockQuestion();

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

    (getAnswer as ReturnType<typeof vi.fn>).mockReturnValue(answerData);
    (getAnswers as ReturnType<typeof vi.fn>).mockReturnValue(answersData);
    (getThreads as ReturnType<typeof vi.fn>).mockReturnValue(threadsData);
    (postAnswer as ReturnType<typeof vi.fn>).mockReturnValue(postData);
  });

  test('homework question is initially empty', () => {
    expect(homework.question).toBe(undefined);
  });

  test('homework answers are initially empty', () => {
    expect(homework.answers).toHaveLength(0);
  });

  test('getQuestion calls api', async () => {
    await homework.getQuestion(questionId);

    expect(getQuestion).toHaveBeenCalledTimes(1);
    expect(getQuestion).toHaveBeenCalledWith(questionId);
  });

  test('getQuestion sets question', async () => {
    (getQuestion as ReturnType<typeof vi.fn>).mockResolvedValue(questionData);

    await homework.getQuestion(questionId);

    expect(homework.question).toStrictEqual(questionData);
  });

  test('getAnswers always calls getAnswer', async () => {
    const threads = true;
    await homework.getAnswers({ authorId, questionId, threads });

    expect(getAnswers).toHaveBeenCalledTimes(1);
    expect(getAnswers).toHaveBeenCalledWith({ authorId, questionId });
  });

  test('getAnswers sets getThreads based result if threads enabled', async () => {
    const threads = true;
    await homework.getAnswers({ authorId, questionId, threads });

    expect(getThreads).toHaveBeenCalledTimes(1);
    expect(getThreads).toHaveBeenCalledWith(answersData);
    expect(homework.answers).toStrictEqual(threadsData);
  });

  test('getAnswers sets getAnswer based result if threads disabled', async () => {
    const threads = false;
    await homework.getAnswers({ authorId, questionId, threads });

    expect(getThreads).not.toHaveBeenCalled();
    expect(homework.answers).toStrictEqual(answersData);
  });

  test('getAnswerById calls getAnswer', async () => {
    const threads = true;
    await homework.getAnswerById(answerId, threads);

    expect(getAnswer).toHaveBeenCalledTimes(1);
    expect(getAnswer).toHaveBeenCalledWith(answerId);
  });

  test('getAnswerById sets getThreads based result if threads enabled', async () => {
    const threads = true;
    await homework.getAnswerById(answerId, threads);

    expect(getThreads).toHaveBeenCalledTimes(1);
    expect(getThreads).toHaveBeenCalledWith([answerData]);
    expect(homework.answers).toStrictEqual(threadsData);
  });

  test('getAnswerById sets getAnswer based result if threads disabled', async () => {
    const threads = false;
    await homework.getAnswerById(answerId, threads);

    expect(getThreads).not.toHaveBeenCalled();
    expect(homework.answers).toStrictEqual([answerData]);
  });

  test('postAnswer calls api', async () => {
    await homework.postAnswer({ parentId, questionId, text });

    expect(postAnswer).toHaveBeenCalledTimes(1);
    expect(postAnswer).toHaveBeenCalledWith({ parentId, questionId, text });
  });

  test('postAnswer returns answer', async () => {
    const result = await homework.postAnswer({ parentId, questionId, text });

    expect(result).toStrictEqual(postData);
  });

  test('postAnswer shows toast on success', async () => {
    await homework.postAnswer({ parentId, questionId, text });

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
  });

  test('postAnswer doesnt show toast on fail', async () => {
    (postAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.postAnswer({ parentId, questionId, text });

    expect(toasts.addMessage).not.toHaveBeenCalled();
  });

  test('deleteAnswer calls api', async () => {
    await homework.deleteAnswer(answerId);

    expect(deleteAnswer).toHaveBeenCalledTimes(1);
    expect(deleteAnswer).toHaveBeenCalledWith(answerId);
  });

  test('deleteAnswer shows toast on success', async () => {
    await homework.deleteAnswer(answerId);

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
  });

  test('deleteAnswer doesnt show toast on fail', async () => {
    (deleteAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.deleteAnswer(answerId);

    expect(toasts.addMessage).not.toHaveBeenCalled();
  });

  test('updateAnswer calls api', async () => {
    await homework.updateAnswer(answerId, text);

    expect(updateAnswer).toHaveBeenCalledTimes(1);
    expect(updateAnswer).toHaveBeenCalledWith(answerId, text);
  });

  test('updateAnswer shows toast on success', async () => {
    await homework.updateAnswer(answerId, text);

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
  });

  test('updateAnswer doesnt show toast on fail', async () => {
    (updateAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.updateAnswer(answerId, text);

    expect(toasts.addMessage).not.toHaveBeenCalled();
  });
});
