import type { Reaction } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { mockEmoji } from './emoji';
import { mockAuthor } from './mockAuthor';

export const mockReaction = ({
  slug = faker.datatype.uuid(),
  emoji = mockEmoji(),
  author = mockAuthor(),
  answer = faker.datatype.uuid(),
}: Reaction): Reaction => ({
  slug,
  emoji,
  author,
  answer,
});
