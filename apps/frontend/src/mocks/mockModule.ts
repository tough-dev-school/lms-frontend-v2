import type { Module } from '@/api/generated/types';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export const mockModule = (payload: Partial<Module> = {}): Required<Module> => {
  const startDate = (
    faker.datatype.boolean() ? faker.date.recent() : faker.date.future()
  ).toISOString();

  const hasStarted = dayjs().isAfter(startDate);

  return {
    has_started: hasStarted,
    id: faker.number.int(),
    name: faker.lorem.words(3),
    description: faker.lorem.words(3),
    text: faker.lorem.words(3),
    start_date: startDate,
    ...payload,
  };
};
