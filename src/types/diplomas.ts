import type { Author } from './homework';

interface Course {
  name: string;
}

export interface Diploma {
  course: Course;
  slug: string;
  language: 'RU' | 'EN';
  image: string;
  student: Author;
  url: string;
}
