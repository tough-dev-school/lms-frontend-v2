import type { Reaction } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { mockEmoji } from './emoji';
import { mockAuthor } from './mockAuthor';

export const mockReaction = (payload: Partial<Reaction> = {}): Reaction => ({
  slug: faker.string.uuid(),
  emoji: mockEmoji(),
  author: mockAuthor(),
  answer: faker.string.uuid(),
  ...payload,
});
