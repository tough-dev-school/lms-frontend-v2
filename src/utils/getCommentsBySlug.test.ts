import { describe, expect, test } from 'vitest';
import getCommentsBySlug from './getCommentsBySlug';
import { faker } from '@faker-js/faker';
import shuffle from 'lodash/shuffle';
import {
  getAnswerData,
  getCommentsData,
  getThreadData,
} from '@/mocks/homework';

describe('getCommentsBySlug', () => {
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
