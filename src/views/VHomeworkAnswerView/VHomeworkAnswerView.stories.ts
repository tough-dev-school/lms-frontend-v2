import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';

export default {
  title: 'App/VHomeworkAnswerView',
  component: VHomeworkAnswerView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswerView },
  setup() {
    return { args };
  },
  template: '<VHomeworkAnswerView v-bind="args" />',
});

export const Default = {
  render: Template,
};
