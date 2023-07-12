import VReactions, { type VReactionsProps } from './VReactions.vue';
import { ReactionEmoji } from '@/types/homework';

export const ALLOWED_REACTIONS = Object.values(ReactionEmoji);
export const MAX_REACTIONS = 3;

export { VReactions, VReactionsProps };
