import { ReactionEmoji } from '@/types/homework';

import VReactions, { type VReactionsProps } from './VReactions.vue';

export const ALLOWED_REACTIONS = Object.values(ReactionEmoji);
export const MAX_REACTIONS = 3;

export { VReactions, VReactionsProps };
