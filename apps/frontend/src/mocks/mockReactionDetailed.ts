import { faker } from '@faker-js/faker';
import { mockEmoji } from './mockEmoji';
import { mockUserSafe, STATIC_AUTHOR_1, STATIC_AUTHOR_2 } from './mockUserSafe';
import type { ReactionDetailed } from '@/api/generated/generated-api';
import { ReactionEmoji } from '@/components/VReactions/VReactions.vue';

export const mockReactionDetailed = (
  payload: Partial<ReactionDetailed> = {},
): ReactionDetailed => ({
  slug: faker.string.uuid(),
  emoji: mockEmoji(),
  author: mockUserSafe(),
  answer: faker.string.uuid(),
  ...payload,
});

export const STATIC_REACTION_1 = mockReactionDetailed({
  author: STATIC_AUTHOR_2,
  emoji: ReactionEmoji.HAPPY,
});

export const STATIC_REACTION_2 = mockReactionDetailed({
  author: STATIC_AUTHOR_1,
  emoji: ReactionEmoji.HAPPY,
});

export const STATIC_REACTION_3 = mockReactionDetailed({
  author: STATIC_AUTHOR_1,
  emoji: ReactionEmoji.LIKE,
});

export const STATIC_REACTIONS = [
  STATIC_REACTION_1,
  STATIC_REACTION_2,
  STATIC_REACTION_3,
];
