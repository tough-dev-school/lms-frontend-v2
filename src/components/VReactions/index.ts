import VReactions from './VReactions.vue';
import type { User } from '@/types/User';

type ReactionAuthor = Pick<User, 'firstName' | 'lastName' | 'uuid'>;

interface Reaction {
  emoji: string;
  author: ReactionAuthor;
}

export { VReactions, type Reaction, type ReactionAuthor };
