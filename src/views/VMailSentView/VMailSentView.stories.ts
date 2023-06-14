import type { Meta, StoryFn } from '@storybook/vue3';
import VMailSentView from './VMailSentView.vue';

export default {
  title: 'App/VMailSentView',
  component: VMailSentView,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VMailSentView },
  setup() {
    return { args };
  },
  template: '<VMailSentView v-bind="args" />',
});

export const Default = {
  render: Template,
};
