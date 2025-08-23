import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockUserSafe } from './mockUserSafe';
import { LOREM_CONTENT, mockContent } from './mockContent';
import type { AnswerTree } from '@/api/generated-api';

export const mockAnswer = (
  payload: Partial<AnswerTree> = {},
): Required<AnswerTree> => {
  const text = mockContent(LOREM_CONTENT);
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
    legacy_text: text,
    has_descendants: false,
    reactions: [],
    is_editable: true,
    descendants: [],
    parent: faker.string.uuid(),
    ...payload,
  };
};
