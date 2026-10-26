import { Hono } from 'hono';
import type { Context } from 'hono';
import {
  homeworkAnswersCreate,
  homeworkAnswersDestroy,
  homeworkAnswersList,
  homeworkAnswersPartialUpdate,
  homeworkAnswersRetrieve,
  homeworkCrosschecksList,
  homeworkQuestionsRetrieve,
  lmsLessonsRetrieve,
} from '@/api/generated';
import type { QuestionDetail } from '@/api/generated';
import { isApiError } from '@/api/client';
import { urls } from '@/urls';
import { getMe } from '../auth';
import { readBody, readString } from '../body';
import { redirectBack, setFlash, submitForm } from '../forms';
import type { AppEnv } from '../types';

// TipTap sends the document as JSON, anything else means an empty answer
const readContent = (body: Record<string, unknown>) =>
  typeof body.content === 'object' && body.content !== null
    ? (body.content as Record<string, unknown>)
    : undefined;

const getLesson = (question: QuestionDetail) =>
  question.breadcrumbs.lesson
    ? lmsLessonsRetrieve(question.breadcrumbs.lesson.id)
    : Promise.resolve(null);

const findAnswer = async (slug: string) => {
  try {
    return await homeworkAnswersRetrieve(slug);
  } catch (error) {
    if (isApiError(error) && error.status === 404) return null;
    throw error;
  }
};

const renderAnswer = async (
  c: Context<AppEnv>,
  questionId: string,
  answerId: string,
) => {
  const [question, answer, crosschecks] = await Promise.all([
    homeworkQuestionsRetrieve(questionId),
    findAnswer(answerId),
    homeworkCrosschecksList({ question: questionId }),
  ]);

  // A deleted or foreign answer link falls back to the question, like it did before
  if (!answer) return c.redirect(urls.homework(questionId));

  return c.var.inertia.render('VHomeworkAnswerView', {
    questionId,
    question,
    answer,
    lesson: await getLesson(question),
    crosschecks,
  });
};

const renderQuestion = async (c: Context<AppEnv>, questionId: string) => {
  const me = await getMe(c);
  const [question, ownAnswers] = await Promise.all([
    homeworkQuestionsRetrieve(questionId),
    homeworkAnswersList({ question: questionId, author: me.uuid }),
  ]);

  // Students who already answered see their answer instead of an empty form
  const ownAnswer = ownAnswers.results[0];
  if (ownAnswer) return c.redirect(urls.homework(questionId, ownAnswer.slug));

  return c.var.inertia.render('VHomeworkQuestionView', {
    questionId,
    question,
    lesson: await getLesson(question),
  });
};

export const homework = new Hono<AppEnv>()
  .get('/homework/:questionId', (c) => {
    const questionId = c.req.param('questionId');
    const answerId = c.req.query('answerId');

    return answerId
      ? renderAnswer(c, questionId, answerId)
      : renderQuestion(c, questionId);
  })
  // Answers, comments and replies all go through here, a comment has a parent
  .post('/homework/:questionId/answers', async (c) => {
    const questionId = c.req.param('questionId');
    const body = await readBody(c);
    const parent = readString(body, 'parent');

    return submitForm(c, async () => {
      const answer = await homeworkAnswersCreate({
        question: questionId,
        parent: parent || null,
        content: readContent(body),
      });

      setFlash(c, { createdAnswer: answer.slug });

      return parent
        ? redirectBack(c, urls.homework(questionId))
        : c.redirect(urls.homework(questionId, answer.slug), 303);
    });
  })
  .patch('/homework/answers/:slug', async (c) => {
    const body = await readBody(c);

    return submitForm(c, async () => {
      await homeworkAnswersPartialUpdate(c.req.param('slug'), {
        content: readContent(body),
      });
      return redirectBack(c);
    });
  })
  .delete('/homework/answers/:slug', async (c) => {
    await homeworkAnswersDestroy(c.req.param('slug'));
    return redirectBack(c);
  })
  // Old links from emails and the Django admin
  .get('/homework/answers/:answerId/', async (c) => {
    const answerId = c.req.param('answerId');
    const answer = await homeworkAnswersRetrieve(answerId);
    return c.redirect(urls.homework(answer.question, answerId));
  })
  .get('/homework/questions/:questionId', (c) =>
    c.redirect(urls.homework(c.req.param('questionId'))),
  )
  .get('/homework/question-admin/:questionId', (c) =>
    c.redirect(urls.homework(c.req.param('questionId'))),
  );
