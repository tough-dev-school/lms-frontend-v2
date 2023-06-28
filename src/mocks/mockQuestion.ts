import type { Question } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { contentLorem } from './mockHtmlContent';

export const mockQuestion = (payload: Partial<Question> = {}): Question => ({
  slug: faker.string.uuid(),
  name: faker.lorem.words(3),
  text: contentLorem(),
  ...payload,
});
