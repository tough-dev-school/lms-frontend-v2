import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getComments } from '@/api/homework';
import {
  getAnswersData,
  getCommentsData,
  getThreadData,
} from '@/mocks/homework';
import { faker } from '@faker-js/faker';
import getThreads from './getThreads';
import getCommentsBySlug from '@/utils/getCommentsBySlug';
import { flushPromises } from '@vue/test-utils';

const n = faker.datatype.number({
  min: 3,
  max: 10,
});

const answers = getAnswersData(n);

vi.mock('@/api/homework', () => {
  return {
    getComments: vi.fn(),
  };
});

vi.mock('@/utils/getCommentsBySlug');

describe('getThreads', () => {
  beforeEach(() => {
    (getCommentsBySlug as ReturnType<typeof vi.fn>).mockReturnValue([]);
  });

  test('call getComments with answer ids', () => {
    getThreads(answers);

    expect(getComments).toHaveBeenCalledOnce();
    expect(getComments).toHaveBeenCalledWith(
      answers.map((answer) => answer.slug),
    );
  });

  test('call getCommentsBySlug for each answer', async () => {
    getThreads(answers);

    await flushPromises();

    expect(getCommentsBySlug).toHaveBeenCalledTimes(answers.length);
    expect(getCommentsBySlug).toHaveBeenLastCalledWith(
      undefined,
      answers.at(-1)?.slug,
    );
  });

  test('return threads', async () => {
    const comments = getCommentsData(getThreadData()).descendants;
    (getCommentsBySlug as ReturnType<typeof vi.fn>).mockReturnValue(comments);

    expect(await getThreads(answers)).toHaveLength(answers.length);
    expect(await getThreads(answers)).toStrictEqual(
      answers.map((answer) => {
        return {
          ...answer,
          descendants: comments,
        };
      }),
    );
  });
});
