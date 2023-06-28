import type { Question } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { LOREM_CONTENT, mockContent } from './mockContent';

export const mockQuestion = (payload: Partial<Question> = {}): Question => ({
  slug: faker.string.uuid(),
  name: faker.lorem.words(3),
  text: mockContent(LOREM_CONTENT),
  ...payload,
});

export const STATIC_QUESTION = {
  slug: 'd89180cd-1bba-4fb9-873f-7b6ad6e3865e',
  name: 'Just a static question',
  text: mockContent(LOREM_CONTENT),
};
