import type { Meta, StoryFn } from '@storybook/vue3';

import { VToast } from '@/components/VToast';

export default {
  component: VToast,
  title: 'Toasts/VToast',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VToast },
  setup() {
    return { args };
  },
  template: '<VToast v-bind="args" />',
});

export const Default = {
  args: { text: 'This is a message!' },
  render: Template,
};

export const Error = {
  args: { text: 'This is a error!', type: 'error' },
  render: Template,
};

export const Success = {
  args: { text: 'This is a success!', type: 'success' },
  render: Template,
};
