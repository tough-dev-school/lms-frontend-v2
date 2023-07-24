import type { Meta, StoryFn } from '@storybook/vue3';

import { VAnswerActionsDesktop } from '@/components/VAnswerActionsDesktop';

export default {
  component: VAnswerActionsDesktop,
  title: 'AnswerActions/VAnswerActionsDesktop',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerActionsDesktop },
  setup() {
    return { args };
  },
  template: '<VAnswerActionsDesktop v-bind="args"/>',
});

export const Default = {
  args: {
    allowDelete: true,
    allowEdit: true,
    deleteTime: 10,
    editTime: 30,
  },

  render: Template,
};

export const DeletePassed = {
  args: {
    allowDelete: false,
    allowEdit: true,
    deleteTime: 0,
    editTime: 30,
  },

  render: Template,
};

export const AllPassed = {
  args: {
    allowDelete: false,
    allowEdit: false,
    deleteTime: 10,
    editTime: 30,
  },

  render: Template,
};
