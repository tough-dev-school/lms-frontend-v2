import { getComments } from '@/api/homework';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockComment } from '@/mocks/mockComment';
import { mockComments } from '@/mocks/mockComments';
import { mockThread } from '@/mocks/mockThread';
import getCommentsBySlug from '@/utils/getCommentsBySlug';
import { faker } from '@faker-js/faker';
import { flushPromises } from '@vue/test-utils';

import getThreads from './getThreads';

const answers = faker.helpers.multiple(mockAnswer, {
  count: { max: 10, min: 3 },
});

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

    expect(getComments).toHaveBeenCalledTimes(1);
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
    const comments = mockComments([
      mockComment(mockThread(mockAnswer())),
    ]).descendants;
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
