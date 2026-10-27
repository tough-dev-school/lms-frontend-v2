import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  homeworkQuestionsRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import type { Lesson, QuestionDetail } from '@/api/generated';
import { LESSON_HOMEWORK } from '@/mocks/courses';
import { QUESTION_DETAIL_NOT_SENT } from '@/mocks/homework';

const LESSON_NOT_SENT: Lesson = {
  ...LESSON_HOMEWORK,
  homework: { is_sent: false },
};

export default {
  title: 'App/VHomeworkQuestionView',
  component: VHomeworkQuestionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn<{ question: QuestionDetail; lesson: Lesson }> = (
  args,
) => ({
  components: { VHomeworkQuestionView },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(
      homeworkQuestionsRetrieveQueryKey(args.question.slug),
      args.question,
    );
    queryClient.setQueryData(
      lmsLessonsRetrieveQueryKey(args.lesson.id),
      args.lesson,
    );

    return { args };
  },
  template: '<VHomeworkQuestionView :question-id="args.question.slug" />',
});

export const Default = {
  render: Template,
  args: {
    question: QUESTION_DETAIL_NOT_SENT,
    lesson: LESSON_NOT_SENT,
  },
};

export const WithoutDeadline = {
  render: Template,
  args: {
    question: { ...QUESTION_DETAIL_NOT_SENT, deadline: null },
    lesson: {
      ...LESSON_NOT_SENT,
      question: { ...LESSON_NOT_SENT.question, deadline: null },
    } satisfies Lesson,
  },
};
