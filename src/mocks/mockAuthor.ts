import type { Author } from '@/types/homework';
import { fakerRU as faker } from '@faker-js/faker';

export const mockAuthor = (payload: Partial<Author> = {}): Author => ({
  uuid: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  ...payload,
});

const staticAuthor = (seed: number) => {
  faker.seed(seed);
  return {
    uuid: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
};

export const STATIC_AUTHOR_1: Author = staticAuthor(1);

export const STATIC_AUTHOR_2: Author = staticAuthor(2);

export const STATIC_AUTHOR_3: Author = staticAuthor(3);
