import type { ModuleDetail } from '@/api/generated/generated-api';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export const getMockModuleDetail = (
  payload: Partial<ModuleDetail> = {},
): ModuleDetail => {
  const startDate = (
    faker.datatype.boolean() ? faker.date.recent() : faker.date.future()
  ).toISOString();

  const hasStarted = dayjs().isAfter(startDate);

  return {
    has_started: hasStarted,
    id: faker.number.int(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    start_date: startDate,
    lesson_count: faker.number.int({ min: 1, max: 10 }),
    single_lesson_id: faker.number.int(),
    ...payload,
  };
};
