import type { Author } from '@/types/homework';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import { faker } from '@faker-js/faker';

export const mockAuthorData = ({
  uuid = faker.datatype.uuid(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
}: Partial<Author> = {}) => {
  return responseCaseMiddleware({
    uuid,
    first_name: firstName,
    last_name: lastName,
  }) as Author;
};
