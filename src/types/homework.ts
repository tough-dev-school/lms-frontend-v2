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

export interface Author {
  uuid: string;
  firstName: string;
  lastName: string;
}

export interface Reaction {
  slug: string;
  emoji: ReactionEmoji;
  author: Author;
  answer: string;
}

export interface Answer {
  created: string;
  modified: string;
  slug: string;
  question: string;
  author: Author;
  text: string;
  src: string;
  hasDescendants: boolean;
  reactions: Reaction[];
}

export interface Thread extends Answer {
  descendants: Comment[];
}

export interface Comment extends Thread {
  parent: string;
}

export interface Question {
  text: string;
  name: string;
  slug: string;
}

export interface Comments {
  slug: string;
  descendants: Comment[];
}
