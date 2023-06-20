import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '../components/VReactionsPalette';

export const mockReactionsData = () => {
  return [...Array(faker.datatype.number({ min: 1, max: 15 }))].map(() => {
    return {
      emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
      author: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        uuid: faker.datatype.uuid(),
      },
    };
  });
};
