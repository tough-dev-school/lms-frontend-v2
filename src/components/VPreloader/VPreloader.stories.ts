import type { Meta, StoryFn } from '@storybook/vue3';

import { VPreloader } from '@/components/VPreloader';

export default {
  component: VPreloader,
  title: 'UI/VPreloader',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPreloader },
  setup() {
    return { args };
  },
  template: '<VPreloader v-bind="args" />',
});

export const Default = {
  render: Template,
};
