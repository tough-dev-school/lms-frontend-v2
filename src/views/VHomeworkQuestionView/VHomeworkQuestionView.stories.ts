import type { Meta, StoryFn } from '@storybook/vue3';
import { VHomeworkQuestionView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VHomeworkQuestionView',
  component: VHomeworkQuestionView,
  decorators: [defaultLayoutDecorator],
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
