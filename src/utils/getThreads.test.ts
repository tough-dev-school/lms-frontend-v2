import { describe, test, expect, vi } from 'vitest';
import { getComments } from '@/api/homework';
import { getAnswersData } from '@/mocks/homework';
import { faker } from '@faker-js/faker';
import getThreads from './getThreads';
import getCommentsBySlug from './getCommentsBySlug';

const n = faker.datatype.number({
  min: 3,
  max: 10,
});

const answers = getAnswersData(n);

vi.mock('@/api/homework');
vi.mock('./getCommentsBySlug');

describe('getThreads', () => {
  test('call getComments for each answer', () => {
    getThreads(answers);

    expect(getComments).toHaveBeenCalledTimes(answers.length);
  });

  test('call getComments once for answer', () => {
    getThreads([...answers, ...answers]);

    expect(getComments).toHaveBeenCalledTimes(n);
  });

  test('call getCommentsBySlug for each answer', () => {
    getThreads(answers);

    expect(getCommentsBySlug).toHaveBeenCalledTimes(answers.length);
    expect(getCommentsBySlug).toHaveBeenCalledWith(false);
  });

  // return threads
});
