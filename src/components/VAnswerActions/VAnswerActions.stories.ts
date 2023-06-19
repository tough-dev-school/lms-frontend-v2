import type { Meta, StoryFn } from '@storybook/vue3';
import { VAnswerActions } from '@/components/VAnswerActions';
import dayjs from 'dayjs';

export default {
  title: 'AnswerActions/VAnswerActions',
  component: VAnswerActions,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerActions },
  setup() {
    return { args };
  },
  template: '<VAnswerActions v-bind="args"/>',
});

export const Default = {
  render: Template,

  args: {
    created: dayjs().toISOString(),
    deleteTime: 10,
    editTime: 30,
  },
};

export const DeletePassed = {
  render: Template,

  args: {
    created: dayjs().toISOString(),
    deleteTime: 0,
    editTime: 30,
  },
};

export const AllPassed = {
  render: Template,

  args: {
    created: dayjs().toISOString(),
    deleteTime: 0,
    editTime: 0,
  },
};
