import { describe, expect, test } from 'vitest';
import getCommentsBySlug from './getCommentsBySlug';
import { faker } from '@faker-js/faker';
import shuffle from 'lodash/shuffle';
import { mockThread } from '@/mocks/mockThread';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockComments } from '@/mocks/mockComments';

describe('getCommentsBySlug', () => {
  test('getCommentsBySlug returns array if nothing found', () => {
    expect(getCommentsBySlug([], faker.string.uuid())).toStrictEqual([]);
  });

  test('getCommentsBySlug returns array of comments', () => {
    const targetSlug = faker.string.uuid();
    const n = 10;

    const parent = { ...mockThread(mockAnswer()), slug: targetSlug };

    const needed = mockComments(parent);
    const notNeeded = faker.helpers.multiple(() => mockComments(mockThread()), {
      count: 10,
    });

    const commentsData = shuffle([needed, ...notNeeded]);

    expect(
      getCommentsBySlug(commentsData, targetSlug).every(
        (comment) => comment.parent === targetSlug,
      ),
    ).toBe(true);
    expect(getCommentsBySlug(commentsData, targetSlug)).toHaveLength(n);
  });
});
