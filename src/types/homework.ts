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
  parent?: string;
  descendants: Answer[];
}

export interface Question {
  text: string;
  name: string;
  slug: string;
}
