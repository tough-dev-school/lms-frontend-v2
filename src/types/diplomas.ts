import type { Author } from './homework';

interface Course {
  name: string;
}

export interface Diploma {
  course: Course;
  image: string;
  language: 'EN' | 'RU';
  slug: string;
  student: Author;
  url: string;
}
