import VReactionsPalette from './VReactionsPalette.vue';

export enum ReactionEmoji {
  LIKE = '👍',
  DISLIKE = '👎',
  HAPPY = '😄',
  PARTY = '🎉',
  SAD = '😕',
  HEART = '❤️',
  ROCKET = '🚀',
  SEEN = '👀',
}

const ALLOWED_REACTIONS = Object.values(ReactionEmoji);

export { VReactionsPalette, ALLOWED_REACTIONS };
