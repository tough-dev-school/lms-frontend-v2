import VReactions from './VReactions.vue';
import { type Reaction, ReactionEmoji } from '@/types/homework';

export const ALLOWED_REACTIONS = Object.values(ReactionEmoji);
export const MAX_REACTIONS = 3;

const getUsedReactions = (reactions: Reaction[], authorId: string) =>
  reactions
    .filter((reaction) => reaction.author.uuid === authorId)
    .map((reaction) => reaction.emoji as ReactionEmoji);

export { VReactions, getUsedReactions };
