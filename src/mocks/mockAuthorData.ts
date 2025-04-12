import type { Author } from '@/types/homework';
import responseCaseMiddleware from '@/api/responseCaseMiddleware';
import { faker } from '@faker-js/faker';

export const mockAuthorData = ({
  uuid = faker.string.uuid(),
  firstName = faker.person.firstName(),
  lastName = faker.person.lastName(),
}: Partial<Author> = {}) => {
  return responseCaseMiddleware({
    uuid,
    first_name: firstName,
    last_name: lastName,
  }) as Author;
};
