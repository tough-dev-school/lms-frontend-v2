import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VHomeworkQuestionView } from '.';

export default {
  component: VHomeworkQuestionView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VHomeworkQuestionView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestionView },
  setup() {
    return { args };
  },
  template: '<VHomeworkQuestionView v-bind="args" />',
});

export const Default = {
  render: Template,
};
