import type { Meta, StoryFn } from '@storybook/vue3';
import { VAnswer } from '@/components/VAnswer';
import { mockAnswer } from '@/mocks/mockAnswer';

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
    answer: mockAnswer(),
  },
};

export const NoReactions = {
  render: Template,

  args: {
    answer: mockAnswer(),
    showReactions: false,
  },
};

// #TODO Add stories for OWN answers (=disabled reactions)
