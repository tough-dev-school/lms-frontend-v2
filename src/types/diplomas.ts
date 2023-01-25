interface Student {
  uuid: string;
  first_name: string;
  last_name: string;
}

interface Course {
  name: string;
}

export interface Diploma {
  course: Course;
  slug: string;
  language: 'RU' | 'EN';
  image: string;
  student: Student;
  url: string;
}
