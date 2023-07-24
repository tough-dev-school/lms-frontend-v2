import { mockAnswer } from '@/mocks/mockAnswer';
import { mockComment } from '@/mocks/mockComment';
import { mockComments } from '@/mocks/mockComments';
import { mockThread } from '@/mocks/mockThread';
import { faker } from '@faker-js/faker';
import shuffle from 'lodash/shuffle';

import getCommentsBySlug from './getCommentsBySlug';

describe('getCommentsBySlug', () => {
  test('getCommentsBySlug returns array if nothing found', () => {
    expect(getCommentsBySlug([], faker.string.uuid())).toStrictEqual([]);
  });

  test('getCommentsBySlug returns array of comments', () => {
    const targetSlug = faker.string.uuid();
    const n = 10;
    const generateData = (slug: string) =>
      mockComments(
        faker.helpers.multiple(
          () => ({
            ...mockComment({ ...mockThread(mockAnswer()), parent: slug }),
            slug,
          }),
          { count: 10 },
        ),
      );
    const needed = generateData(targetSlug);
    const notNeeded = faker.helpers.multiple(
      () => generateData(faker.string.uuid()),
      { count: 10 },
    );
    const commentsData = shuffle([...notNeeded, needed]);

    expect(
      getCommentsBySlug(commentsData, targetSlug).every(
        (comment) => comment.parent === targetSlug,
      ),
    ).toBe(true);
    expect(getCommentsBySlug(commentsData, targetSlug)).toHaveLength(n);
  });
});
