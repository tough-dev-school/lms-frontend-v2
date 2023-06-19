import type { Meta, StoryFn } from '@storybook/vue3';
import VOwnAnswer from '@/components/VOwnAnswer';
import { faker } from '@faker-js/faker';
import { getAnswerData } from '@/mocks/homework';
import dayjs from 'dayjs';

export default {
  title: 'Answer/VOwnAnswer',
  component: VOwnAnswer,
} as Meta;

const answer = getAnswerData();
const editableAnswer = getAnswerData();
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
    questionId: faker.datatype.uuid(),
    parentId: faker.datatype.uuid(),
  },
};

export const Editable = {
  render: Template,

  args: {
    answer: editableAnswer,
    questionId: faker.datatype.uuid(),
    parentId: faker.datatype.uuid(),
  },
};
