import type { Meta, StoryFn } from '@storybook/vue3';

import { VButton } from '@/components/VButton';

export default {
  component: VButton,
  title: 'Forms/VButton',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VButton },
  setup() {
    return { args };
  },
  template: '<VButton v-bind="args">Press me</VButton>',
});

export const Default = {
  args: {
    appearance: 'button',
  },

  render: Template,
};

export const Link = {
  args: {
    appearance: 'link',
  },

  render: Template,
};
