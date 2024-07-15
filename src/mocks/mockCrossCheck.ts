import type { CrossCheck } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { mockAuthor } from './mockAuthor';

export const mockCrossCheck = (
  payload: Partial<CrossCheck> = {},
): CrossCheck => {
  return {
    is_checked: false,
    answer: {
      url: faker.internet.url(),
      author: mockAuthor(),
    },
    ...payload,
  };
};
