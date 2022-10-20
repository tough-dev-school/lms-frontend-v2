interface Author {
  uuid: string;
  first_name: string;
  last_name: string;
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
