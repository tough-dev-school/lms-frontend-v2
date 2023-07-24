import { ALLOWED_REACTIONS } from '@/components/VReactions';
import { mockAuthorData } from '@/mocks/mockAuthorData';
import { type Reaction, ReactionEmoji } from '@/types/homework';
import { faker } from '@faker-js/faker';
import times from 'lodash/times';

export const mockReactionData = (): Reaction => ({
  answer: faker.string.uuid(),
  author: mockAuthorData(),
  emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
  slug: faker.string.uuid(),
});

export const mockReactionsData = (n: number = 10): Reaction[] => {
  return times(faker.number.int({ max: n, min: 1 }), mockReactionData);
};

export const staticReactionsData = [
  {
    answer: 'd8ce5365-06d4-48a2-a693-a1cb80daec65',
    author: {
      firstName: 'Presley',
      lastName: 'McGlynn',
      uuid: 'de3a6039-69f6-4f62-989d-5174e86307b4',
    },
    emoji: ReactionEmoji.SAD,
    slug: '16755f89-3e16-4aaf-9783-27d508428a90',
  },
  {
    answer: '2db0b308-9088-411d-bdf7-be23e1d7508a',
    author: {
      firstName: 'Donnell',
      lastName: 'Konopelski',
      uuid: '56dbc4fc-3b25-4c3a-ba8e-e0ff988fdb88',
    },
    emoji: ReactionEmoji.LIKE,
    slug: 'c0c55444-cca2-4e31-80ae-ba073bc4012f',
  },
  {
    answer: 'bc1339c1-1a77-4c56-bbc8-86b885d9817c',
    author: {
      firstName: 'Hosea',
      lastName: 'Champlin',
      uuid: '071e9f6c-a16e-4c9e-a4dd-98a0ee57baf9',
    },
    emoji: ReactionEmoji.LIKE,
    slug: '1a183409-f595-49b7-821b-61f329851603',
  },
  {
    answer: '89fb2eb0-aba8-4e52-8f7b-c0c2d42a2dfe',
    author: {
      firstName: 'Lucio',
      lastName: 'Jaskolski',
      uuid: '737e077a-e740-4cee-8d49-f3ba57e49798',
    },
    emoji: ReactionEmoji.LIKE,
    slug: 'adf11798-6162-4938-885e-80bb15f349a7',
  },
];
