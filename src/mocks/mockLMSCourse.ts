import type { LMSCourse } from '@/api/generated-api';
import { faker } from '@faker-js/faker';

export const mockLMSCourse = (
  payload: Partial<LMSCourse> = {},
): Required<LMSCourse> => {
  return {
    id: faker.number.int(),
    name: faker.lorem.words(3),
    slug: faker.string.uuid(),
    cover: faker.image.url(),
    chat: faker.internet.url(),
    calendar_ios: faker.internet.url(),
    calendar_google: faker.internet.url(),
    ...payload,
  };
};
