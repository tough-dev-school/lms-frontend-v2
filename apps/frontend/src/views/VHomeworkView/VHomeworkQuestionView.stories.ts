import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import type { Lesson } from '@/api/generated';
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

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestionView },
  setup() {
    return { args };
  },
  template:
    '<VHomeworkQuestionView :question-id="args.question.slug" :question="args.question" :lesson="args.lesson" />',
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

// Questions outside a lesson have no deadline pill
export const WithoutLesson = {
  render: Template,
  args: {
    question: QUESTION_DETAIL_NOT_SENT,
    lesson: null,
  },
};
