// #FIXME Split into separate modules

import { faker } from '@faker-js/faker';
import { LanguageEnum } from '@/api/generated/generated-api';
import type { Diploma } from '@/api/generated/generated-api';
import { mockLocale } from './mockLocale';
import { mockUserSafe, STATIC_AUTHOR_1 } from './mockUserSafe';

export const mockDiplomaData = (): Diploma => {
  return {
    course: {
      product_name: faker.commerce.productName(),
      name: faker.commerce.productName(),
      name_international: faker.commerce.productName(),
      tariff_name: faker.commerce.productName(),
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
      course: {
        product_name: payload.course.product_name,
        name: payload.course.name,
        name_international: payload.course.name_international,
        tariff_name: payload.course.tariff_name,
      },
    };
  });
};

export const STATIC_DIPLOMA_1: Diploma = {
  course: {
    product_name: 'Amazing Course',
    name: 'Amazing Course',
    name_international: 'Amazing Course',
    tariff_name: 'Amazing Course',
  },
  slug: 'diploma-1',
  language: LanguageEnum.RU,
  image: '/diploma-mock.jpg',
  student: STATIC_AUTHOR_1,
  url: 'https://example.com/diploma/1',
};

export const STATIC_DIPLOMA_2: Diploma = {
  course: {
    product_name: 'Cool Course',
    name: 'Cool Course',
    name_international: 'Cool Course',
    tariff_name: 'Cool Course',
  },
  slug: 'diploma-2',
  language: LanguageEnum.RU,
  image: '/diploma-mock.jpg',
  student: STATIC_AUTHOR_1,
  url: 'https://example.com/diploma/2',
};

export const STATIC_DIPLOMA_3: Diploma = {
  course: {
    product_name: 'Pro Course',
    name: 'Pro Course',
    name_international: 'Pro Course',
    tariff_name: 'Pro Course',
  },
  slug: 'diploma-3',
  language: LanguageEnum.RU,
  image: '/diploma-mock.jpg',
  student: STATIC_AUTHOR_1,
  url: 'https://example.com/diploma/3',
};

export const STATIC_DIPLOMAS = [
  STATIC_DIPLOMA_1,
  STATIC_DIPLOMA_2,
  STATIC_DIPLOMA_3,
];
