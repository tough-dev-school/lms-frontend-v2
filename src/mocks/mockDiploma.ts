// #FIXME Split into separate modules

import type { Diploma } from '@/types/diplomas';

import { faker } from '@faker-js/faker';

import { STATIC_AUTHOR_1, mockAuthor } from './mockAuthor';
import { DiplomaLocale, mockLocale } from './mockLocale';

export const mockDiplomaData = (): Diploma => {
  return {
    course: {
      name: faker.commerce.productName(),
    },
    image: '/diploma-mock.jpg',
    language: mockLocale(),
    slug: faker.string.uuid(),
    student: mockAuthor(),
    url: faker.internet.url(),
  };
};

export const mockDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(DiplomaLocale).map((locale) => {
    return {
      ...payload,
      course: { name: payload.course.name },
      language: locale,
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
