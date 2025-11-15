import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockUserSafe } from './mockUserSafe';
import type { AnswerTree } from '@/api/generated/generated-api';

export const mockAnswer = (
  payload: Partial<AnswerTree> = {},
): Required<AnswerTree> => {
  const text = faker.lorem.paragraph(1);
  return {
    created: dayjs().toISOString(),
    modified: dayjs().toISOString(),
    slug: faker.string.uuid(),
    question: faker.string.uuid(),
    author: mockUserSafe(),
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text }],
        },
      ],
    },
    legacy_text: `<p>${text}</p>`,
    has_descendants: false,
    reactions: [],
    is_editable: true,
    descendants: [],
    parent: faker.string.uuid(),
    ...payload,
  };
};
