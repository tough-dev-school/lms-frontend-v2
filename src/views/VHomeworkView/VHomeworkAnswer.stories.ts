import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkAnswer from './VHomeworkAnswer.vue';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockQuestion } from '@/mocks/mockQuestion';
import { mockUserSafe, STATIC_AUTHOR_1 } from '@/mocks/mockUserSafe';
import { LOREM_CONTENT, mockContent } from '@/mocks/mockContent';
import {
  populateAnswersCacheFromDescendants,
  homeworkKeys,
  userKeys,
} from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

const answer = mockAnswer({
  text: mockContent(LOREM_CONTENT),
  author: STATIC_AUTHOR_1,
  descendants: [
    mockAnswer({
      text: mockContent(LOREM_CONTENT),
    }),
  ],
});

const question = mockQuestion({
  text: mockContent(LOREM_CONTENT),
});

const user = mockUserSafe();

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
  title: 'Views/VHomeworkAnswer',
  component: VHomeworkAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswer },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(homeworkKeys.crosschecks(question.slug), []);

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
  template: '<VHomeworkAnswer v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    answer,
    question,
    user,
    breadcrumbs,
    lesson,
  },
};

export const NoLesson = {
  render: Template,
  args: {
    answer,
    question,
    user,
    breadcrumbs,
  },
};
