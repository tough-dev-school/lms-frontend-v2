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
import getThreads from '@/utils/getThreads';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockThread } from '@/mocks/mockThread';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockComment } from '@/mocks/mockComment';

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

    expect(getQuestion).toHaveBeenCalledOnce();
    expect(getQuestion).toHaveBeenCalledWith(questionId);
  });

  test('getQuestion sets question', async () => {
    (getQuestion as ReturnType<typeof vi.fn>).mockResolvedValue(questionData);

    await homework.getQuestion(questionId);

    expect(homework.question).toStrictEqual(questionData);
  });

  test('getAnswers always calls getAnswer', async () => {
    const threads = true;
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getAnswers).toHaveBeenCalledOnce();
    expect(getAnswers).toHaveBeenCalledWith({ questionId, authorId });
  });

  test('getAnswers sets getThreads based result if threads enabled', async () => {
    const threads = true;
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getThreads).toHaveBeenCalledOnce();
    expect(getThreads).toHaveBeenCalledWith(answersData);
    expect(homework.answers).toStrictEqual(threadsData);
  });

  test('getAnswers sets getAnswer based result if threads disabled', async () => {
    const threads = false;
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getThreads).not.toHaveBeenCalled();
    expect(homework.answers).toStrictEqual(answersData);
  });

  test('getAnswerById calls getAnswer', async () => {
    const threads = true;
    await homework.getAnswerById(answerId, threads);

    expect(getAnswer).toHaveBeenCalledOnce();
    expect(getAnswer).toHaveBeenCalledWith(answerId);
  });

  test('getAnswerById sets getThreads based result if threads enabled', async () => {
    const threads = true;
    await homework.getAnswerById(answerId, threads);

    expect(getThreads).toHaveBeenCalledOnce();
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
    await homework.postAnswer({ text, questionId, parentId });

    expect(postAnswer).toHaveBeenCalledOnce();
    expect(postAnswer).toHaveBeenCalledWith({ text, questionId, parentId });
  });

  test('postAnswer returns answer', async () => {
    const result = await homework.postAnswer({ text, questionId, parentId });

    expect(result).toStrictEqual(postData);
  });

  test('postAnswer shows toast on success', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(toasts.addMessage).toHaveBeenCalledOnce();
  });

  test('postAnswer doesnt show toast on fail', async () => {
    (postAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.postAnswer({ text, questionId, parentId });

    expect(toasts.addMessage).not.toHaveBeenCalled();
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

  test('deleteAnswer doesnt show toast on fail', async () => {
    (deleteAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.deleteAnswer(answerId);

    expect(toasts.addMessage).not.toHaveBeenCalled();
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

  test('updateAnswer doesnt show toast on fail', async () => {
    (updateAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.updateAnswer(answerId, text);

    expect(toasts.addMessage).not.toHaveBeenCalled();
  });
});
