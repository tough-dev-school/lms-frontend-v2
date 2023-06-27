import VReactions from './VReactions.vue';
import type { Reaction } from '@/types/homework';

export interface VReactionsProps {
  answerId: string;
  reactions: Reaction[];
  hidePalette?: boolean;
  reactionsClasses?: string;
  paletteClasses?: string;
}

export { VReactions };
