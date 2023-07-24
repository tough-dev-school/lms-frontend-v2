import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VLoginView } from '.';

export default {
  component: VLoginView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VLoginView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginView },
  setup() {
    return { args };
  },
  template: '<VLoginView v-bind="args" />',
});

export const Default = {
  render: Template,
};
