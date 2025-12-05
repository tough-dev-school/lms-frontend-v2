import type { Lesson } from '@/api/generated/generated-api';
import { faker } from '@faker-js/faker';
import { mockQuestion } from './mockQuestion';

export const getMockLesson = (payload: Partial<Lesson> = {}): Lesson => {
  return {
    id: faker.number.int(),
    material: faker.datatype.boolean()
      ? {
          id: faker.string.uuid(),
          title: faker.lorem.words(3),
        }
      : undefined,
    homework: {
      is_sent: faker.datatype.boolean(),
      question: mockQuestion(),
    },
    question: mockQuestion(),
    call: faker.datatype.boolean()
      ? {
          name: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          url: faker.internet.url(),
          video: [],
          datetime: faker.date.future().toISOString(),
          recommended_video_provider: null,
        }
      : undefined,
    ...payload,
  };
};
