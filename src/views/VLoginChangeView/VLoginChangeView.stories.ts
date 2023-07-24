import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VLoginChangeView } from '.';

export default {
  component: VLoginChangeView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VLoginChangeView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginChangeView },
  setup() {
    return { args };
  },
  template: '<VLoginChangeView v-bind="args" />',
});

export const Default = {
  render: Template,
};
