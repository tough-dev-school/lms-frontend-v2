import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockUserSafe } from './mockUserSafe';
import htmlToMarkdown from '@/utils/htmlToMarkdown';
import { LOREM_CONTENT, mockContent } from './mockContent';
import type { AnswerDetailed } from '@/api/generated-api';

export const mockAnswer = (
  payload: Partial<AnswerDetailed> = {},
): AnswerDetailed => {
  const text = mockContent(LOREM_CONTENT);
  return {
    created: dayjs().toISOString(),
    modified: dayjs().toISOString(),
    slug: faker.string.uuid(),
    question: faker.string.uuid(),
    author: mockUserSafe(),
    text,
    src: htmlToMarkdown(text),
    has_descendants: false,
    reactions: [],
    parent: faker.string.uuid(),
    ...payload,
  };
};
