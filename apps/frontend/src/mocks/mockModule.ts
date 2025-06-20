import type { Module } from '@/api/generated-api';
import { faker } from '@faker-js/faker';

export const mockModule = (payload: Partial<Module> = {}): Required<Module> => {
  return {
    id: faker.number.int(),
    name: faker.lorem.words(3),
    description: faker.lorem.words(3),
    text: faker.lorem.words(3),
    start_date: faker.date.recent().toISOString(),
    ...payload,
  };
};
