import type { UserSafe } from '@/api/generated-api';
import { fakerRU as faker } from '@faker-js/faker';

export const mockUserSafe = ({
  seed,
  payload,
}: {
  seed?: number;
  payload?: Partial<UserSafe>;
} = {}): Required<UserSafe> => {
  if (seed) faker.seed(seed);

  return {
    uuid: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    first_name_en: faker.person.firstName(),
    last_name_en: faker.person.lastName(),
    avatar: faker.image.url(),
    ...payload,
  };
};

export const STATIC_AUTHOR_1: UserSafe = mockUserSafe({ seed: 1 });

export const STATIC_AUTHOR_2: UserSafe = mockUserSafe({ seed: 2 });

export const STATIC_AUTHOR_3: UserSafe = mockUserSafe({ seed: 3 });
