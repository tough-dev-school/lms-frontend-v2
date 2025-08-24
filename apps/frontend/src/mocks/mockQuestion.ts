import { faker } from '@faker-js/faker';
import type { Question } from '@/api/generated-api';

export const mockQuestion = (
  payload: Partial<Question> = {},
): Required<Question> => {
  return {
    deadline: faker.date.future().toISOString(),
    slug: faker.string.uuid(),
    name: faker.lorem.words(3),
    markdown_text: '# Hello _world_!',
    ...payload,
  };
};

export const STATIC_QUESTION = {
  slug: 'd89180cd-1bba-4fb9-873f-7b6ad6e3865e',
  name: 'Just a static question',
  markdown_text: '# Hello _world_!',
};
