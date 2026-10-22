import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  homeworkQuestionsRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
  homeworkCrosschecksListQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { usePopulateAnswersCache } from '@/composables/usePopulateAnswersCache';
import type { Lesson } from '@/api/generated';
import { LESSON_HOMEWORK } from '@/mocks/courses';
import {
  CLASSMATE_ANSWER,
  CROSSCHECKS,
  QUESTION_DETAIL,
  STUDENT_ANSWER,
  STUDENT_ANSWER_WITHOUT_REPLIES,
} from '@/mocks/homework';

export default {
  title: 'App/VHomeworkAnswerView',
  component: VHomeworkAnswerView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    question: QUESTION_DETAIL,
    lesson: LESSON_HOMEWORK,
    crosschecks: CROSSCHECKS,
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswerView },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(
      homeworkQuestionsRetrieveQueryKey(args.question.slug),
      args.question,
    );
    // The view caches replies only after the answer loads, a seeded answer never triggers that
    usePopulateAnswersCache()(args.answer);
    queryClient.setQueryData(
      lmsLessonsRetrieveQueryKey(args.lesson.id),
      args.lesson,
    );
    queryClient.setQueryData(
      homeworkCrosschecksListQueryKey({ question: args.question.slug }),
      args.crosschecks,
    );

    return { args };
  },
  template:
    '<VHomeworkAnswerView :question-id="args.question.slug" :answer-id="args.answer.slug" />',
});

export const Default = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER,
  },
};

// The classmate answer is already checked, so the page offers to go back to the own answer
export const OtherUserAnswer = {
  render: Template,
  args: {
    answer: CLASSMATE_ANSWER,
  },
};

export const WithoutCrossChecks = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER,
    lesson: {
      ...LESSON_HOMEWORK,
      homework: { ...LESSON_HOMEWORK.homework, crosschecks: undefined },
    } satisfies Lesson,
    crosschecks: [],
  },
};

export const WithoutComments = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER_WITHOUT_REPLIES,
  },
};
