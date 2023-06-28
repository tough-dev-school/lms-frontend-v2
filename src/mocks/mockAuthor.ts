import type { Author } from '@/types/homework';
import { faker } from '@faker-js/faker';

export const mockAuthor = ({
  uuid = faker.string.uuid(),
  firstName = faker.person.firstName(),
  lastName = faker.person.lastName(),
}: Author): Author => ({
  uuid,
  firstName,
  lastName,
});
