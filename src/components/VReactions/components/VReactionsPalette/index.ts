import { ReactionEmoji } from '@/types/homework';

import VReactionsPalette from './VReactionsPalette.vue';

const ALLOWED_REACTIONS = Object.values(ReactionEmoji);

const MAX_REACTIONS = 3;

interface VReactionsPaletteProps {
  usedReactions?: ReactionEmoji[];
}

export {
  ALLOWED_REACTIONS,
  MAX_REACTIONS,
  VReactionsPalette,
  type VReactionsPaletteProps,
};
