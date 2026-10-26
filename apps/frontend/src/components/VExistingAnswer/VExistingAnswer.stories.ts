import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VExistingAnswer from '@/components/VExistingAnswer/VExistingAnswer.vue';
import {
  LEGACY_ANSWER,
  LONG_REVIEW_ANSWER,
  STUDENT_ANSWER_WITHOUT_REPLIES,
} from '@/mocks/homework';
import { STUDENT_SAFE } from '@/mocks/users';

export default {
  title: 'Answer/VExistingAnswer',
  component: VExistingAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VExistingAnswer },
  setup() {
    return { args };
  },
  template: '<VExistingAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer: LONG_REVIEW_ANSWER,
  },
};

export const Short = {
  render: Template,

  args: {
    answer: STUDENT_ANSWER_WITHOUT_REPLIES,
  },
};

export const LegacyText = {
  render: Template,

  args: {
    answer: { ...LEGACY_ANSWER, author: STUDENT_SAFE, is_editable: true },
  },
};
