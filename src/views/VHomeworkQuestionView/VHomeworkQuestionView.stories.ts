import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';

export default {
  title: 'App/VHomeworkQuestionView',
  component: VHomeworkQuestionView,
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
