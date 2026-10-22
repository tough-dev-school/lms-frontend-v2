import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCrossChecks from '@/components/VCrossChecks/VCrossChecks.vue';
import { CROSSCHECKS } from '@/mocks/homework';
import { LONG_NAME_CLASSMATE } from '@/mocks/users';

export default {
  title: 'Homework/VCrossChecks',
  component: VCrossChecks,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCrossChecks },
  setup() {
    return { args };
  },
  template: '<VCrossChecks v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    crosschecks: CROSSCHECKS,
  },
};

export const NoneChecked = {
  render: Template,
  args: {
    crosschecks: CROSSCHECKS.map((crosscheck) => ({
      ...crosscheck,
      is_checked: false,
    })),
  },
};

export const AllChecked = {
  render: Template,
  args: {
    crosschecks: CROSSCHECKS.map((crosscheck) => ({
      ...crosscheck,
      is_checked: true,
    })),
  },
};

export const LongAuthorName = {
  render: Template,
  args: {
    crosschecks: [
      {
        ...CROSSCHECKS[0],
        answer: { ...CROSSCHECKS[0].answer, author: LONG_NAME_CLASSMATE },
      },
      ...CROSSCHECKS.slice(1),
    ],
  },
};
