import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import { createAnswerTree, createUserSafe } from '@/api/generated/mocks';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const STATIC_AUTHOR_1 = createUserSafe();
const answer = createAnswerTree();
const ownAnswer = { ...answer, author: STATIC_AUTHOR_1 };

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
    answer,
    user: createUserSafe(),
  },
};

export const Own = {
  render: Template,

  args: {
    answer: ownAnswer,
    user: STATIC_AUTHOR_1,
  },
};

// #TODO Add stories for OWN answers (=disabled reactions)
