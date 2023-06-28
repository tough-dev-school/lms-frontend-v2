import type { Answer } from '@/types/homework';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockAuthor } from './mockAuthor';
import { mockReaction } from './mockReaction';
import htmlToMarkdown from '@/utils/htmlToMarkdown';
import { LOREM_CONTENT, mockContent } from './mockContent';

export const mockAnswer = (payload: Partial<Answer> = {}): Answer => {
  const text = mockContent(LOREM_CONTENT);
  return {
    created: dayjs().toISOString(),
    modified: dayjs().toISOString(),
    slug: faker.string.uuid(),
    question: faker.string.uuid(),
    author: mockAuthor(),
    text,
    src: htmlToMarkdown(text),
    hasDescendants: false,
    reactions: faker.helpers.multiple(mockReaction, {
      count: { min: 0, max: 5 },
    }),
    ...payload,
  };
};
