import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkQuestion from './VHomeworkQuestion.vue';
import { mockQuestion } from '@/mocks/mockQuestion';
import { LOREM_CONTENT, mockContent } from '@/mocks/mockContent';
import {
  populateAnswersCacheFromDescendants,
  homeworkKeys,
  userKeys,
} from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockUserSafe } from '@/mocks/mockUserSafe';

const user = mockUserSafe();

const answer = mockAnswer({
  text: mockContent(LOREM_CONTENT),
  descendants: [
    mockAnswer({
      text: mockContent(LOREM_CONTENT),
    }),
  ],
});

const question = mockQuestion({
  text: mockContent(LOREM_CONTENT),
});

const breadcrumbs = [
  {
    name: 'Homework',
    to: { name: 'homework' },
  },
  {
    name: question.name,
    to: { name: 'homework', params: { questionId: question.slug } },
  },
];

const lesson = {
  homework: {
    total: 10,
    done: 5,
  },
};

export default {
  title: 'Views/VHomeworkQuestion',
  component: VHomeworkQuestion,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestion },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(userKeys.me(), user);

    // Populate individual answers cache
    populateAnswersCacheFromDescendants(queryClient, answer);

    // Populate answers list cache
    queryClient.setQueryData(
      homeworkKeys.questionAnswers({
        questionId: question.slug,
        authorId: user.uuid,
      }),
      [answer],
    );

    return { args };
  },
  template: '<VHomeworkQuestion v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    question,
    breadcrumbs,
    lesson,
  },
};

export const NoLesson = {
  render: Template,
  args: {
    question,
    breadcrumbs,
  },
};
