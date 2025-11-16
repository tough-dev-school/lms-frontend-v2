import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswerActions from '@/components/VAnswerActions/VAnswerActions.vue';

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
