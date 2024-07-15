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
  avatar?: string;
}

export interface Reaction {
  slug: string;
  emoji: ReactionEmoji;
  author: Author;
  answer: string;
}

export interface Post {
  created: string;
  modified: string;
  slug: string;
  question: string;
  author: Author;
  text: string;
  src: string;
  reactions: Reaction[];
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
  text: string;
  name: string;
  slug: string;
}

export interface Comments {
  slug: string;
  descendants: Comment[];
}

export interface CrossCheckAnswer {
  author: Author;
  url: string;
}

export interface CrossCheck {
  is_checked: boolean;
  answer: CrossCheckAnswer;
}
