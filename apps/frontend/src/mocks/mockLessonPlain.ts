import type { LessonPlain } from '@/api/generated/generated-api';
import { faker } from '@faker-js/faker';

export const mockLessonPlain = (
  payload: Partial<LessonPlain> = {},
): Required<LessonPlain> => {
  return {
    id: faker.number.int(),
    ...payload,
  };
};
