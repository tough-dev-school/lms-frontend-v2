import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VTextInput from '@/components/VTextInput/VTextInput.vue';

export default {
  title: 'Forms/VTextInput',
  component: VTextInput,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VTextInput },
  setup() {
    return { args };
  },
  template: '<VTextInput placeholder="Enter some text…" v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    tip: 'This is a tooltip for text',
    label: 'Basic text input',
  },
};

export const ErrorWithMessage = {
  render: Template,

  args: {
    error: 'This is error',
  },
};

export const ErrorWithoutMessage = {
  render: Template,

  args: {
    error: true,
  },
};
