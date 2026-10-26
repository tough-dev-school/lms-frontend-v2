import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VThread from '@/components/VThread/VThread.vue';
import { CLASSMATE_ANSWER, STUDENT_ANSWER } from '@/mocks/homework';

export default {
  title: 'Answer/VThread',
  component: VThread,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VThread },
  setup() {
    return { args };
  },
  template: '<VThread :answer="args.answer" />',
});

export const OwnAnswer = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER,
  },
};

export const ClassmateAnswer = {
  render: Template,
  args: {
    answer: CLASSMATE_ANSWER,
  },
};
