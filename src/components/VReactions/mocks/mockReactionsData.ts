import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '@/components/VReactions';
import times from 'lodash/times';
import type { Reaction } from '@/types/homework';
import { mockAuthorData } from '@/mocks/mockAuthorData';

export const mockReactionData = (): Reaction => ({
  slug: faker.datatype.uuid(),
  answer: faker.datatype.uuid(),
  emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
  author: mockAuthorData(),
});

export const mockReactionsData = (n: number = 10): Reaction[] => {
  return times(faker.datatype.number({ min: 1, max: n }), mockReactionData);
};

export const staticReactionsData = [
  {
    slug: '16755f89-3e16-4aaf-9783-27d508428a90',
    answer: 'd8ce5365-06d4-48a2-a693-a1cb80daec65',
    emoji: '😕',
    author: {
      uuid: 'de3a6039-69f6-4f62-989d-5174e86307b4',
      firstName: 'Presley',
      lastName: 'McGlynn',
    },
  },
  {
    slug: 'c0c55444-cca2-4e31-80ae-ba073bc4012f',
    answer: '2db0b308-9088-411d-bdf7-be23e1d7508a',
    emoji: '👍',
    author: {
      uuid: '56dbc4fc-3b25-4c3a-ba8e-e0ff988fdb88',
      firstName: 'Donnell',
      lastName: 'Konopelski',
    },
  },
  {
    slug: '1a183409-f595-49b7-821b-61f329851603',
    answer: 'bc1339c1-1a77-4c56-bbc8-86b885d9817c',
    emoji: '❤️',
    author: {
      uuid: '071e9f6c-a16e-4c9e-a4dd-98a0ee57baf9',
      firstName: 'Hosea',
      lastName: 'Champlin',
    },
  },
  {
    slug: 'adf11798-6162-4938-885e-80bb15f349a7',
    answer: '89fb2eb0-aba8-4e52-8f7b-c0c2d42a2dfe',
    emoji: '👍',
    author: {
      uuid: '737e077a-e740-4cee-8d49-f3ba57e49798',
      firstName: 'Lucio',
      lastName: 'Jaskolski',
    },
  },
];
