import type { Answer } from '@/types/homework';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockAuthor } from './mockAuthor';
import { mockReaction } from './mockReaction';
import htmlToMarkdown from '@/utils/htmlToMarkdown';
import { mockHtmlContent } from './mockHtmlContent';

export const mockAnswer = (payload: Partial<Answer> = {}): Answer => ({
  created: dayjs().toISOString(),
  modified: dayjs().toISOString(),
  slug: faker.string.uuid(),
  question: faker.string.uuid(),
  author: mockAuthor(),
  text: mockHtmlContent(),
  src: htmlToMarkdown(mockHtmlContent()),
  hasDescendants: false,
  reactions: faker.helpers.multiple(mockReaction, {
    count: { min: 0, max: 15 },
  }),
  ...payload,
});
