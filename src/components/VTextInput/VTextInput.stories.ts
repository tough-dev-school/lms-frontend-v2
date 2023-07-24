import type { Meta, StoryFn } from '@storybook/vue3';

import { VTextInput } from '@/components/VTextInput';

export default {
  component: VTextInput,
  title: 'Forms/VTextInput',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextInput },
  setup() {
    return { args };
  },
  template: '<VTextInput placeholder="Enter some text…" v-bind="args" />',
});

export const Default = {
  args: {
    label: 'Basic text input',
    tip: 'This is a tooltip for text',
  },

  render: Template,
};

export const ErrorWithMessage = {
  args: {
    error: 'This is error',
  },

  render: Template,
};

export const ErrorWithoutMessage = {
  args: {
    error: true,
  },

  render: Template,
};
