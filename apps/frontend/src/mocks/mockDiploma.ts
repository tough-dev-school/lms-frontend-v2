// #FIXME Split into separate modules

import { faker } from '@faker-js/faker';
import { LanguageEnum } from '@/api/generated/types';
import type { Diploma } from '@/api/generated/types';
import { mockLocale } from './mockLocale';
import { mockUserSafe, STATIC_AUTHOR_1 } from './mockUserSafe';

export const mockDiplomaData = (): Diploma => {
  return {
    course: {
      product_name: faker.commerce.productName(),
    },
    slug: faker.string.uuid(),
    language: mockLocale(),
    image: '/diploma-mock.jpg',
    student: mockUserSafe(),
    url: faker.internet.url(),
  };
};

export const mockDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(LanguageEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: { product_name: payload.course.product_name },
    };
  });
};

export const STATIC_DIPLOMA_1: Diploma = {
  ...mockDiplomaData(),
  course: {
    product_name: 'Amazing Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMA_2: Diploma = {
  ...mockDiplomaData(),
  course: {
    product_name: 'Cool Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMA_3: Diploma = {
  ...mockDiplomaData(),
  course: {
    product_name: 'Pro Course',
  },
  student: STATIC_AUTHOR_1,
};

export const STATIC_DIPLOMAS = [
  STATIC_DIPLOMA_1,
  STATIC_DIPLOMA_2,
  STATIC_DIPLOMA_3,
];
