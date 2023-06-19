import type { Meta, StoryFn } from '@storybook/vue3';
import VLoadingView from './VLoadingView';

export default {
  title: 'App/VLoadingView',
  component: VLoadingView,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoadingView },
  setup() {
    return { args };
  },
  template: '<VLoadingView v-bind="args" />',
});

export const Default = {
  render: Template,
};
