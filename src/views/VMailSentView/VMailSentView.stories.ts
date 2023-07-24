import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VMailSentView } from '.';

export default {
  component: VMailSentView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VMailSentView',
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
