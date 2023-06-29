import { faker } from '@faker-js/faker';
import type { Diploma } from '@/types/diplomas';
import { DiplomaLocale, mockLocale } from './mockLocale';
import { mockAuthor, STATIC_AUTHOR_1 } from './mockAuthor';

export const mockDiplomaData = (): Diploma => {
  return {
    course: {
      name: faker.commerce.productName(),
    },
    slug: faker.string.uuid(),
    language: mockLocale(),
    image: '/diploma-mock.jpg',
    student: mockAuthor(),
    url: faker.internet.url(),
  };
};

export const mockDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(DiplomaLocale).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: { name: payload.course.name },
    };
  });
};

export const STATIC_DIPLOMA_1: Diploma = {
  ...mockDiplomaData(),
  course: {
    name: 'Amazing Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMA_2: Diploma = {
  ...mockDiplomaData(),
  course: {
    name: 'Cool Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMA_3: Diploma = {
  ...mockDiplomaData(),
  course: {
    name: 'Pro Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMAS = [
  STATIC_DIPLOMA_1,
  STATIC_DIPLOMA_2,
  STATIC_DIPLOMA_3,
];
