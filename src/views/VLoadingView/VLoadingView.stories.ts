import type { Meta, StoryFn } from '@storybook/vue3';

import { VLoadingView } from '.';

export default {
  component: VLoadingView,
  title: 'App/VLoadingView',
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
