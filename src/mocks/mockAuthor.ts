import type { Author } from '@/types/homework';
import { fakerRU as faker } from '@faker-js/faker';

export const mockAuthor = ({
  seed,
  payload,
}: {
  seed?: number;
  payload?: Partial<Author>;
} = {}) => {
  if (seed) faker.seed(seed);

  return {
    uuid: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    ...payload,
  };
};

export const STATIC_AUTHOR_1: Author = mockAuthor({ seed: 1 });

export const STATIC_AUTHOR_2: Author = mockAuthor({ seed: 2 });

export const STATIC_AUTHOR_3: Author = mockAuthor({ seed: 3 });
