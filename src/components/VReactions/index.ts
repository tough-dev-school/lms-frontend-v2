import VReactions from './VReactions.vue';
import type { Reaction, ReactionEmoji } from '@/types/homework';
import type { VReactionsPaletteProps } from './components/VReactionsPalette';

export interface VReactionsProps extends VReactionsPaletteProps {
  answerId: string;
  reactions: Reaction[];
  palette?: boolean;
}

const getUsedReactions = (reactions: Reaction[], authorId: string) =>
  reactions
    .filter((reaction) => reaction.author.uuid === authorId)
    .map((reaction) => reaction.emoji as ReactionEmoji);

export { VReactions, getUsedReactions };
