import type { Author } from '@/types/homework';

import { faker } from '@faker-js/faker';

import { USER_1, USER_2, USER_3 } from './mockUserId';

export const mockAuthor = (payload: Partial<Author> = {}): Author => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  uuid: faker.string.uuid(),
  ...payload,
});

export const STATIC_AUTHOR_1: Author = {
  firstName: 'Янка',
  lastName: 'Купала',
  uuid: USER_1,
};

export const STATIC_AUTHOR_2: Author = {
  firstName: 'Якуб',
  lastName: 'Колас',
  uuid: USER_2,
};

export const STATIC_AUTHOR_3: Author = {
  firstName: 'Максим',
  lastName: 'Богданович',
  uuid: USER_3,
};
