import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkExpertView from './VHomeworkExpertView.vue';

export default {
  title: 'App/VHomeworkExpertView',
  component: VHomeworkExpertView,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkExpertView },
  setup() {
    return { args };
  },
  template: '<VHomeworkExpertView v-bind="args" />',
});

export const Default = {
  render: Template,
};
