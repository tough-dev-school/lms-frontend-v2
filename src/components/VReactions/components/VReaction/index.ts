import VReaction from './VReaction.vue';
import type { Reaction, ReactionEmoji } from '@/types/homework';

interface VReactionProps {
  userId: string;
  emoji: ReactionEmoji;
  reactions: Reaction[];
}

export { VReaction, type VReactionProps };
