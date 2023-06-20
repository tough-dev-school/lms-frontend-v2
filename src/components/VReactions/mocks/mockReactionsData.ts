import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '../components/VReactionsPalette';
import times from 'lodash/times';

export const mockReaction = () => ({
  emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
  author: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    uuid: faker.datatype.uuid(),
  },
});

export const mockReactionsData = () => {
  return times(faker.datatype.number({ min: 1, max: 15 }), mockReaction);
};
