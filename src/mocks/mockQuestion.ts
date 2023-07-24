import type { Question } from '@/types/homework';

import { faker } from '@faker-js/faker';

import { LOREM_CONTENT, mockContent } from './mockContent';

export const mockQuestion = (payload: Partial<Question> = {}): Question => ({
  name: faker.lorem.words(3),
  slug: faker.string.uuid(),
  text: mockContent(LOREM_CONTENT),
  ...payload,
});

export const STATIC_QUESTION = {
  name: 'Just a static question',
  slug: 'd89180cd-1bba-4fb9-873f-7b6ad6e3865e',
  text: mockContent(LOREM_CONTENT),
};
