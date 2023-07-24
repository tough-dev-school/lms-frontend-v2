import type { Meta, StoryFn } from '@storybook/vue3';

import { VAnswerActions } from '@/components/VAnswerActions';
import dayjs from 'dayjs';

export default {
  component: VAnswerActions,
  title: 'AnswerActions/VAnswerActions',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerActions },
  setup() {
    return { args };
  },
  template: '<VAnswerActions v-bind="args"/>',
});

export const Default = {
  args: {
    created: dayjs().toISOString(),
    deleteTime: 10,
    editTime: 30,
  },

  render: Template,
};

export const DeletePassed = {
  args: {
    created: dayjs().toISOString(),
    deleteTime: 0,
    editTime: 30,
  },

  render: Template,
};

export const AllPassed = {
  args: {
    created: dayjs().toISOString(),
    deleteTime: 0,
    editTime: 0,
  },

  render: Template,
};
