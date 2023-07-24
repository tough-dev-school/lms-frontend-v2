import type { Author } from '@/types/homework';

import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import { faker } from '@faker-js/faker';

export const mockAuthorData = ({
  firstName = faker.person.firstName(),
  lastName = faker.person.lastName(),
  uuid = faker.string.uuid(),
}: Partial<Author> = {}) => {
  return responseCaseMiddleware({
    first_name: firstName,
    last_name: lastName,
    uuid,
  }) as Author;
};
