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
  getCrossChecks,
} from '@/api/homework';
import getThreads from '@/utils/getThreads';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockThread } from '@/mocks/mockThread';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockComment } from '@/mocks/mockComment';
import type { Thread } from '@/types/homework';
import { mockCrossCheck } from '@/mocks/mockCrossCheck';
import { vi, describe, beforeEach, expect, test } from 'vitest';

vi.mock('@/api/homework', () => {
  return {
    getQuestion: vi.fn(),
    postAnswer: vi.fn(),
    deleteAnswer: vi.fn(),
    updateAnswer: vi.fn(),
    getAnswers: vi.fn(),
    getAnswer: vi.fn(),
    getCrossChecks: vi.fn(),
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
const crosschecksData = faker.helpers.multiple(mockCrossCheck, { count: 3 });
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
    (getCrossChecks as ReturnType<typeof vi.fn>).mockReturnValue(
      crosschecksData,
    );
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
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getAnswers).toHaveBeenCalledTimes(1);
    expect(getAnswers).toHaveBeenCalledWith({ questionId, authorId });
  });

  test('getAnswers sets getThreads based result if threads enabled', async () => {
    const threads = true;
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getThreads).toHaveBeenCalledTimes(1);
    expect(getThreads).toHaveBeenCalledWith(answersData);
    expect(homework.answers).toStrictEqual(threadsData);
  });

  test('getAnswers sets getAnswer based result if threads disabled', async () => {
    const threads = false;
    await homework.getAnswers({ questionId, authorId, threads });

    expect(getThreads).not.toHaveBeenCalled();
    expect(homework.answers).toStrictEqual(answersData);
  });

  test('getCrossChecks', async () => {
    await homework.getCrossChecks(questionId);

    expect(getCrossChecks).toHaveBeenCalledTimes(1);
    expect(getCrossChecks).toHaveBeenCalledWith(questionId);
    expect(homework.crosschecks).toStrictEqual(crosschecksData);
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
    await homework.postAnswer({ text, questionId, parentId });

    expect(postAnswer).toHaveBeenCalledTimes(1);
    expect(postAnswer).toHaveBeenCalledWith({ text, questionId, parentId });
  });

  test('postAnswer returns answer', async () => {
    const result = await homework.postAnswer({ text, questionId, parentId });

    expect(result).toStrictEqual(postData);
  });

  test('postAnswer appends answer', async () => {
    homework.appendAnswer = vi.fn();

    const result = await homework.postAnswer({ text, questionId, parentId });

    expect(homework.appendAnswer).toHaveBeenCalledTimes(1);
    expect(homework.appendAnswer).toHaveBeenCalledWith(result);
  });

  test('postAnswer shows toast on success', async () => {
    await homework.postAnswer({ text, questionId, parentId });

    expect(toasts.addMessage).toHaveBeenCalledTimes(1);
  });

  test('postAnswer doesnt show toast on fail', async () => {
    (postAnswer as ReturnType<typeof vi.fn>).mockRejectedValue({});
    await homework.postAnswer({ text, questionId, parentId });

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

  test('deleteAnswer removes answer from tree', async () => {
    homework.removeAnswerFromTree = vi.fn();

    await homework.deleteAnswer(answerId);

    expect(homework.removeAnswerFromTree).toHaveBeenCalledTimes(1);
    expect(homework.removeAnswerFromTree).toHaveBeenCalledWith(answerId);
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

  test('updateAnswer replaces answer', async () => {
    homework.replaceAnswer = vi.fn();

    const result = await homework.updateAnswer(answerId, text);

    expect(homework.replaceAnswer).toHaveBeenCalledTimes(1);
    expect(homework.replaceAnswer).toHaveBeenCalledWith(result);
  });

  describe('removeAnswerFromTree', () => {
    const answer = mockAnswer();
    const childAnswer = mockComment(mockAnswer());
    const yaAnswer = mockComment({
      ...mockThread(),
      descendants: [childAnswer],
    });

    beforeEach(() => {
      homework.$patch({ answers: [yaAnswer, answer] });
    });

    test('removes answer', () => {
      homework.removeAnswerFromTree(answer.slug);

      expect(homework.answers).toStrictEqual([yaAnswer]);
    });

    test('removes another answer', () => {
      homework.removeAnswerFromTree(yaAnswer.slug);

      expect(homework.answers).toStrictEqual([answer]);
    });

    test('removes child answer', () => {
      homework.removeAnswerFromTree(childAnswer.slug);

      expect(homework.answers).toStrictEqual([yaAnswer, answer]);
      expect((homework.answers[0] as Thread).descendants).toHaveLength(0);
    });
  });

  describe('replaceAnswer', () => {
    test('replaces answer without parent', () => {
      const answer = mockAnswer();
      homework.$patch({ answers: [mockAnswer({ slug: answer.slug })] });

      homework.replaceAnswer(answer);

      expect(homework.answers).toStrictEqual([answer]);
    });

    test('replace answer deepens the tree', () => {
      const answer = mockComment({ ...mockAnswer() });
      const parent = mockComment({
        ...mockThread(),
        descendants: [mockComment({ ...mockAnswer(), slug: answer.slug })],
      });
      homework.$patch({ answers: [parent] });

      homework.replaceAnswer(answer);

      expect(parent.descendants[0]).toStrictEqual(answer);
    });
  });

  describe('appendAnswer', () => {
    test('appends new answer without parent', () => {
      const newAnswer = mockAnswer();

      homework.appendAnswer(newAnswer);

      expect(homework.answers).toStrictEqual([newAnswer]);
    });

    test('appends new answer to the first one', () => {
      const answer = mockThread();
      const yaAnswer = mockThread();
      const newAnswer = mockComment({ ...mockAnswer(), parent: answer.slug });
      homework.$patch({ answers: [answer, yaAnswer] });

      homework.appendAnswer(newAnswer);

      expect(answer.descendants[0]).toStrictEqual(newAnswer);
    });

    test('appends new answer to the last one', () => {
      const answer = mockThread();
      const yaAnswer = mockThread();
      const newAnswer = mockComment({ ...mockAnswer(), parent: yaAnswer.slug });
      homework.$patch({ answers: [answer, yaAnswer] });

      homework.appendAnswer(newAnswer);

      expect(yaAnswer.descendants[0]).toStrictEqual(newAnswer);
    });

    test('appends new answer to the nested one', () => {
      const comment = mockComment(mockThread());
      const answer = mockComment({ ...mockThread(), descendants: [comment] });
      const newAnswer = mockComment({ ...mockAnswer(), parent: comment.slug });
      homework.$patch({ answers: [answer] });

      homework.appendAnswer(newAnswer);

      expect(comment.descendants[0]).toStrictEqual(newAnswer);
    });
  });

  describe('refetchAnswerById', () => {
    test('calls getAnswer', async () => {
      await homework.refetchAnswerById(answerId);

      expect(getAnswer).toHaveBeenCalledTimes(1);
      expect(getAnswer).toHaveBeenCalledWith(answerId);
    });

    test('replaces answer', async () => {
      const answer = mockAnswer();
      (getAnswer as ReturnType<typeof vi.fn>).mockResolvedValue(answer);

      await homework.refetchAnswerById(answerId);

      expect(homework.replaceAnswer).toHaveBeenCalledTimes(1);
      expect(homework.replaceAnswer).toHaveBeenCalledWith(answer);
    });
  });
});
