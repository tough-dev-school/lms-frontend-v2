import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoginView from './VLoginView.vue';

export default {
  title: 'App/VLoginView',
  component: VLoginView,
  parameters: { layout: 'fullscreen', inertia: { props: { user: null } } },
  args: { redirectTo: null },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginView },
  setup() {
    return { args };
  },
  template: '<VLoginView v-bind="args" />',
});

export const Default = {
  render: Template,
};

// An expired magic link brings the student back here with the reason
export const ExpiredLink = {
  render: Template,
  parameters: {
    inertia: {
      props: {
        user: null,
        errors: { link: 'expired' },
      },
    },
  },
};
