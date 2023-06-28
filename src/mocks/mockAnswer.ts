import type { Answer } from '@/types/homework';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { mockAuthor } from './mockAuthor';
import { mockReaction } from './mockReaction';
import htmlToMarkdown from '@/utils/htmlToMarkdown';

export const mockAnswer = ({
  created = dayjs().toISOString(),
  modified = dayjs().toISOString(),
  slug = faker.datatype.uuid(),
  question = faker.datatype.uuid(),
  author = mockAuthor(),
  text,
  hasDescendants = false,
  reactions = faker.helpers.multiple(mockReaction, { min: 0, max: 15 }),
}: Exclude<Answer, 'src'>): Answer => ({
  created,
  modified,
  slug,
  question,
  author,
  text,
  src: htmlToMarkdown(text),
  hasDescendants,
  reactions,
});

// export const getAnswerData = ({
//   created = dayjs().toISOString(),
//   modified = dayjs().toISOString(),
//   slug = faker.datatype.uuid(),
//   question = faker.datatype.uuid(),
//   author = getAuthorData(),
//   content = contentLorem,
//   hasDescendants = false,
//   reactions = staticReactionsData, // #FIXME
// }: Partial<Omit<Answer, 'text' | 'src'>>
