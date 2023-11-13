import type { Meta, StoryFn } from '@storybook/vue3';
import VToast from '@/components/VToast/VToast.vue';

export default {
  title: 'Toasts/VToast',
  component: VToast,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VToast },
  setup() {
    return { args };
  },
  template: '<VToast v-bind="args" />',
});

export const Default = {
  render: Template,
  args: { text: 'This is a message!' },
};

export const Error = {
  render: Template,
  args: { text: 'This is a error!', type: 'error' },
};

export const Success = {
  render: Template,
  args: { text: 'This is a success!', type: 'success' },
};
