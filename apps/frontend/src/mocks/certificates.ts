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
    url: `https://cert.tough-dev.school/${slug}-${language.toLowerCase()}`,
  }));

export const DIPLOMAS_ASYNC_ARCH = createDiplomaSet('k7m2p9x4', {
  name: 'Асинхронная архитектура',
  name_international: 'Asynchronous Architecture',
  product_name: 'Асинхронная архитектура',
  tariff_name: 'С проверкой домашки',
});

export const DIPLOMAS_DELEGATION = createDiplomaSet('r3t8w1q6', {
  name: 'Самому не проще',
  name_international: 'Delegation for Team Leads',
  product_name: 'Самому не проще',
  tariff_name: null,
});

export const DIPLOMAS_PYTHON_TESTING = createDiplomaSet('h5n0v2c9', {
  name: 'Тестирование в Python',
  name_international: 'Testing in Python',
  product_name: 'Тестирование в Python',
  tariff_name: 'Самостоятельный',
});

export const DIPLOMAS: Diploma[] = [
  ...DIPLOMAS_ASYNC_ARCH,
  ...DIPLOMAS_DELEGATION,
  ...DIPLOMAS_PYTHON_TESTING,
];
