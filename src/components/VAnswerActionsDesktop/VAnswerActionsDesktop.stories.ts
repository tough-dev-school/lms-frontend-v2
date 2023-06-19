import type { Meta, StoryFn } from '@storybook/vue3';
import VAnswerActionsDesktop from '@/components/VAnswerActionsDesktop.vue';

export default {
  title: 'AnswerActions/VAnswerActionsDesktop',
  component: VAnswerActionsDesktop,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerActionsDesktop },
  setup() {
    return { args };
  },
  template: '<VAnswerActionsDesktop v-bind="args"/>',
});

export const Default = {
  render: Template,

  args: {
    allowDelete: true,
    allowEdit: true,
    deleteTime: 10,
    editTime: 30,
  },
};

export const DeletePassed = {
  render: Template,

  args: {
    allowDelete: false,
    allowEdit: true,
    deleteTime: 0,
    editTime: 30,
  },
};

export const AllPassed = {
  render: Template,

  args: {
    allowDelete: false,
    allowEdit: false,
    deleteTime: 10,
    editTime: 30,
  },
};
