import VReactions from './VReactions.vue';
import type { Reaction } from '@/types/homework';
import type { VReactionsPaletteProps } from './components/VReactionsPalette';

export interface VReactionsProps extends VReactionsPaletteProps {
  answerId: string;
  reactions: Reaction[];
  palette?: boolean;
}

export { VReactions };
