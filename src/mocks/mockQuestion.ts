import type { Question } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { LOREM_CONTENT, mockContent } from './mockContent';

export const mockQuestion = (payload: Partial<Question> = {}): Question => ({
  slug: faker.string.uuid(),
  name: faker.lorem.words(3),
  text: mockContent(LOREM_CONTENT),
  ...payload,
});
