export enum ReactionEmoji {
  DISLIKE = '👎',
  HAPPY = '😄',
  HEART = '❤️',
  LIKE = '👍',
  PARTY = '🎉',
  ROCKET = '🚀',
  SAD = '😕',
  SEEN = '👀',
}

export interface Author {
  firstName: string;
  lastName: string;
  uuid: string;
}

export interface Reaction {
  answer: string;
  author: Author;
  emoji: ReactionEmoji;
  slug: string;
}

export interface Post {
  author: Author;
  created: string;
  modified: string;
  question: string;
  reactions: Reaction[];
  slug: string;
  src: string;
  text: string;
}

export interface Answer extends Post {
  hasDescendants: boolean;
}

export interface Thread extends Answer {
  descendants: Comment[];
}

export interface Comment extends Thread {
  parent: string;
}

export interface Question {
  name: string;
  slug: string;
  text: string;
}

export interface Comments {
  descendants: Comment[];
  slug: string;
}
