import type { Meta, StoryFn } from '@storybook/vue3';
import VAnswerActionsMobile from '@/components/VAnswerActionsMobile/VAnswerActionsMobile.vue';

export default {
  title: 'AnswerActions/VAnswerActionsMobile',
  component: VAnswerActionsMobile,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerActionsMobile },
  setup() {
    return { args };
  },
  template: '<VAnswerActionsMobile v-bind="args"/>',
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
