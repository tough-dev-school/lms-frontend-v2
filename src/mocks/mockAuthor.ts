import type { Author } from '@/types/homework';
import { faker } from '@faker-js/faker';

export const mockAuthor = (payload: Partial<Author> = {}): Author => ({
  uuid: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  ...payload,
});
