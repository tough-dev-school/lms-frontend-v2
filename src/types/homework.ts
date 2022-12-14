interface Author {
  uuid: string;
  firstName: string;
  lastName: string;
}

export interface Answer {
  created: string;
  modified: string;
  slug: string;
  question: string;
  author: Author;
  text: string;
  src: string;
}

export interface Thread extends Answer {
  descendants: Comment[];
}

export interface Comment extends Answer, Thread {
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
