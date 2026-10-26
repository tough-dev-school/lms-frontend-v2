// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createAnswerTree, createQuestionDetail } from '@/api/generated';
import type { AnswerTree } from '@/api/generated';
import { createAppI18n } from '@/i18n';
import { LESSON_HOMEWORK } from '@/mocks/courses';
import { STUDENT_SAFE } from '@/mocks/users';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';

// Shared fixtures build TipTap JSON from HTML, which needs a DOM, so these are written out by hand
const paragraph = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
});

const COMMENT: AnswerTree = {
  ...createAnswerTree(),
  slug: 'comment-slug',
  content: paragraph('A <b>comment</b>'),
  reactions: [],
  descendants: [],
};

const ANSWER: AnswerTree = {
  ...createAnswerTree(),
  author: STUDENT_SAFE,
  content: paragraph('My answer'),
  reactions: [],
  descendants: [COMMENT],
};

// The server renders this page without a DOM, a browser-only import or call would throw here
describe('VHomeworkAnswerView on the server', () => {
  test('renders the answer and comments without a DOM', async () => {
    const question = createQuestionDetail();
    const app = createSSRApp({
      render: () =>
        h(VHomeworkAnswerView, {
          questionId: question.slug,
          question,
          answer: ANSWER,
          lesson: LESSON_HOMEWORK,
          crosschecks: [],
        }),
    }).use(createAppI18n('ru'));

    const html = await renderToString(app);

    expect(typeof window).toBe('undefined');
    expect(html).toContain('My answer');
    expect(html).toContain('A &lt;b&gt;comment&lt;/b&gt;');
    expect(html).toContain('id="comment-slug"');
  });
});
