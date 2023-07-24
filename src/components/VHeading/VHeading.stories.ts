import type { Meta, StoryFn } from '@storybook/vue3';

import { VHeading } from '@/components/VHeading';

export default {
  component: VHeading,
  title: 'UI/VHeading',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHeading },
  setup() {
    return { args };
  },
  template: '<VHeading v-bind="args">VHeading</VHeading>',
});

export const Default = {
  args: {},
  render: Template,
};

export const H1 = {
  args: {
    tag: 'h1',
  },

  render: Template,
};

export const H2 = {
  args: {
    tag: 'h2',
  },

  render: Template,
};

export const H3 = {
  args: {
    tag: 'h3',
  },

  render: Template,
};
