import { LanguageEnum } from '@/api/generated';
import type { CourseSimple, Diploma } from '@/api/generated';
import { STUDENT_SAFE } from '@/mocks/users';

// Served from public/, external images would make screenshots depend on the network
const DIPLOMA_IMAGE = '/diploma-mock.jpg';

// Every finished course gets a certificate in each language
const createDiplomaSet = (slug: string, course: CourseSimple): Diploma[] =>
  Object.values(LanguageEnum).map((language) => ({
    slug: `${slug}-${language.toLowerCase()}`,
    language,
    course,
    image: DIPLOMA_IMAGE,
    student: STUDENT_SAFE,
    url: `https://example.com/certificates/${slug}-${language.toLowerCase()}`,
  }));

export const DIPLOMAS_REST_API = createDiplomaSet('k7m2p9x4', {
  name: 'Проектирование REST API',
  name_international: 'REST API Design',
  product_name: 'Проектирование REST API',
  tariff_name: 'С проверкой домашки',
});

export const DIPLOMAS_GIT = createDiplomaSet('r3t8w1q6', {
  name: 'Командная работа в Git',
  name_international: 'Teamwork in Git',
  product_name: 'Командная работа в Git',
  tariff_name: null,
});

export const DIPLOMAS_SQL = createDiplomaSet('h5n0v2c9', {
  name: 'Основы SQL',
  name_international: 'SQL Basics',
  product_name: 'Основы SQL',
  tariff_name: 'Самостоятельный',
});

export const DIPLOMAS: Diploma[] = [
  ...DIPLOMAS_REST_API,
  ...DIPLOMAS_GIT,
  ...DIPLOMAS_SQL,
];
