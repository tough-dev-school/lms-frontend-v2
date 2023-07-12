import type { Author } from '@/types/homework';
import { faker } from '@faker-js/faker';
import { USER_1, USER_2, USER_3 } from './mockUserId';

export const mockAuthor = (payload: Partial<Author> = {}): Author => ({
  uuid: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  ...payload,
});

export const STATIC_AUTHOR_1: Author = {
  uuid: USER_1,
  firstName: 'Янка',
  lastName: 'Купала',
};

export const STATIC_AUTHOR_2: Author = {
  uuid: USER_2,
  firstName: 'Якуб',
  lastName: 'Колас',
};

export const STATIC_AUTHOR_3: Author = {
  uuid: USER_3,
  firstName: 'Максим',
  lastName: 'Богданович',
};
