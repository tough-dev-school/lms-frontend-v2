import type {
  Answer,
  Comment,
  Question,
  Thread,
  Author,
} from '@/types/homework';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import htmlToMarkdown from '@/utils/htmlToMarkdown';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

export const contentHtml =
  '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p> <strong>Lorem</strong> <em>ipsum</em> <s>dolor</s> <u>sit</u> <a target="_blank" rel="noopener noreferrer nofollow" href="https://example.com">amet</a>, consectetur adipiscing elit. Suspendisse ut varius justo, vitae accumsan ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur felis metus, laoreet in scelerisque ac, faucibus at nulla. Sed sit amet vulputate urna. Praesent euismod non diam in luctus. Duis volutpat massa sed est auctor, at tincidunt odio facilisis. Integer placerat libero sit amet consectetur consectetur. Suspendisse ultrices nec erat eu porta. Pellentesque sed augue congue, tempus erat vitae, feugiat orci. Ut faucibus massa sollicitudin diam scelerisque efficitur. Suspendisse eget sapien vel purus scelerisque varius nec non sem. Ut ornare lobortis ultricies. Morbi ut iaculis orci. Phasellus sed massa vitae massa tincidunt mattis. Ut posuere facilisis lorem, rhoncus varius orci malesuada eu.</p><blockquote><p>Suspendisse eget sapien vel purus scelerisque varius nec non sem. Ut ornare lobortis ultricies. Morbi ut iaculis orci. Phasellus sed massa vitae massa tincidunt mattis. Ut posuere facilisis lorem, rhoncus varius orci malesuada eu.</p></blockquote><ol><li><p>Option 1</p></li><li><p>Option 2</p></li><li><p>Option 3</p></li></ol><ul><li><p>Option 1</p></li><li><p>Option 2</p></li><li><p>Option 3</p></li></ul>';
export const contentLorem =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';

export const getQuestionData = ({
  slug = faker.datatype.uuid(),
  name = faker.lorem.words(3),
  text = contentLorem,
}: Partial<Question> = {}) => {
  return responseCaseMiddleware({
    slug,
    name,
    text,
  }) as Question;
};

export const getAuthorData = ({
  uuid = faker.datatype.uuid(),
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
}: Partial<Author> = {}) => {
  return responseCaseMiddleware({
    uuid,
    first_name: firstName,
    last_name: lastName,
  }) as Author;
};

export const getAnswerData = ({
  created = dayjs().toISOString(),
  modified = dayjs().toISOString(),
  slug = faker.datatype.uuid(),
  question = faker.datatype.uuid(),
  author = getAuthorData(),
  content = contentLorem,
}: Partial<Omit<Answer, 'text' | 'src'>> & { content?: string } = {}) => {
  return responseCaseMiddleware({
    created,
    modified,
    slug,
    question,
    author,
    text: content,
    src: htmlToMarkdown(content),
  }) as Answer;
};

export const getThreadData = (answer: Answer = getAnswerData()) => {
  return responseCaseMiddleware({ ...answer, descendants: [] }) as Thread;
};

export const getCommentData = (parent: Thread | Comment) => {
  return responseCaseMiddleware({
    ...parent,
    parent: parent.slug,
    question: parent.question,
    descendants: [],
  }) as Comment;
};

export const getCommentsData = (
  parent: Thread | Comment,
  length: number = 1,
) => {
  return [...Array(length)].map(() => getCommentData(parent)) as Comment[];
};

export const getAnswersData = (length: number = 1) => {
  return [...Array(length)].map(() => getAnswerData()) as Answer[];
};
