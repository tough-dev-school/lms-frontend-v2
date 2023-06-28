import type { Meta, StoryFn } from '@storybook/vue3';
import { VOwnAnswer } from '@/components/VOwnAnswer';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { mockAnswer } from '@/mocks/mockAnswer';

export default {
  title: 'Answer/VOwnAnswer',
  component: VOwnAnswer,
} as Meta;

const answer = mockAnswer();
const editableAnswer = mockAnswer();
editableAnswer.created = dayjs().toISOString();

const Template: StoryFn = (args) => ({
  components: { VOwnAnswer },
  setup() {
    return { args };
  },
  template: '<VOwnAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer: answer,
    questionId: faker.string.uuid(),
    parentId: faker.string.uuid(),
  },
};

export const Editable = {
  render: Template,

  args: {
    answer: editableAnswer,
    questionId: faker.string.uuid(),
    parentId: faker.string.uuid(),
  },
};
