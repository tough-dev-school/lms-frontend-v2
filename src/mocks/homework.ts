import type { Answer, Comment, Question, Thread } from '@/types/homework';
import responseCaseMiddleware from '@/axios/responseCaseMiddleware';
import htmlToMarkdown from '@/utils/htmlToMarkdown';

export const contentHtml =
  '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><p> <strong>Lorem</strong> <em>ipsum</em> <s>dolor</s> <u>sit</u> <a target="_blank" rel="noopener noreferrer nofollow" href="https://example.com">amet</a>, consectetur adipiscing elit. Suspendisse ut varius justo, vitae accumsan ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur felis metus, laoreet in scelerisque ac, faucibus at nulla. Sed sit amet vulputate urna. Praesent euismod non diam in luctus. Duis volutpat massa sed est auctor, at tincidunt odio facilisis. Integer placerat libero sit amet consectetur consectetur. Suspendisse ultrices nec erat eu porta. Pellentesque sed augue congue, tempus erat vitae, feugiat orci. Ut faucibus massa sollicitudin diam scelerisque efficitur. Suspendisse eget sapien vel purus scelerisque varius nec non sem. Ut ornare lobortis ultricies. Morbi ut iaculis orci. Phasellus sed massa vitae massa tincidunt mattis. Ut posuere facilisis lorem, rhoncus varius orci malesuada eu.</p><blockquote><p>Suspendisse eget sapien vel purus scelerisque varius nec non sem. Ut ornare lobortis ultricies. Morbi ut iaculis orci. Phasellus sed massa vitae massa tincidunt mattis. Ut posuere facilisis lorem, rhoncus varius orci malesuada eu.</p></blockquote><ol><li><p>Option 1</p></li><li><p>Option 2</p></li><li><p>Option 3</p></li></ol><ul><li><p>Option 1</p></li><li><p>Option 2</p></li><li><p>Option 3</p></li></ul>';
export const contentMarkdown = htmlToMarkdown(contentHtml);

export const getQuestionData = () => {
  return responseCaseMiddleware({
    slug: '5cc7df02-4549-4236-b6d1-1e10d9622334',
    name: 'Вторая домашка',
    text: contentHtml,
  }) as Question;
};

export const getAnswerData = () => {
  return responseCaseMiddleware({
    created: '2020-07-25T19:43:00.750026',
    modified: '2020-07-25T19:43:00.750057',
    slug: '25dc5a1f-c3a9-42fa-abvg-51c313fcec47',
    question: '8a2ea4c6-8767-4756-92da-31a052550e2d',
    author: {
      uuid: '5cc7df02-4549-4236-b6d1-1e10d9622334',
      first_name: 'John',
      last_name: 'Doe',
    },
    text: contentHtml,
    src: contentMarkdown,
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
