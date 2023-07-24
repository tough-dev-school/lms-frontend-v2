import type { Answer } from '@/types/homework';

import htmlToMarkdown from '@/utils/htmlToMarkdown';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import { mockAuthor } from './mockAuthor';
import { LOREM_CONTENT, mockContent } from './mockContent';

export const mockAnswer = (payload: Partial<Answer> = {}): Answer => {
  const text = mockContent(LOREM_CONTENT);
  return {
    author: mockAuthor(),
    created: dayjs().toISOString(),
    hasDescendants: false,
    modified: dayjs().toISOString(),
    question: faker.string.uuid(),
    reactions: [],
    slug: faker.string.uuid(),
    src: htmlToMarkdown(text),
    text,
    ...payload,
  };
};
