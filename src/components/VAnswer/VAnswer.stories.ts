import type { Meta, StoryFn } from '@storybook/vue3';
import { VAnswer } from '@/components/VAnswer';
import { getAnswerData } from '@/mocks/homework';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswer },
  setup() {
    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer: getAnswerData(),
  },
};

export const NoReactions = {
  render: Template,

  args: {
    answer: getAnswerData(),
    showReactions: false,
  },
};
