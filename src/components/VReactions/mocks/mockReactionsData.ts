import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '../components/VReactionsPalette';
import times from 'lodash/times';
import { getAuthorData } from '@/mocks/homework';
import type { Reaction } from '@/types/homework';

export const mockReactionData = (): Reaction => ({
  slug: faker.datatype.uuid(),
  answer: faker.datatype.uuid(),
  emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
  author: getAuthorData(),
});

export const mockReactionsData = (n: number = 10): Reaction[] => {
  return times(faker.datatype.number({ min: 1, max: n }), mockReactionData);
};
