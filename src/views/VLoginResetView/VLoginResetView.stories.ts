import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VLoginResetView } from '.';

export default {
  component: VLoginResetView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VLoginResetView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginResetView },
  setup() {
    return { args };
  },
  template: '<VLoginResetView v-bind="args" />',
});

export const Default = {
  render: Template,
};
