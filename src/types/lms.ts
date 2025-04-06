import type { PaginantedCollection } from './api-utility';

interface Lesson {
  id: number;
  name: string;
  material?: {
    id: number;
    title: string;
  };
  homework: {
    is_sent: boolean;
    crosschecks: {
      total: number;
      checked: number;
    };
    question: {
      slug: string;
      name: string;
      text: string;
      deadline: string;
    };
  };
}

export type Lessons = PaginantedCollection<Lesson>;

interface Module {
  id: number;
  name: string;
}

export type Modules = PaginantedCollection<Module>;
