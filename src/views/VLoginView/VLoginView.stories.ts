import type { Meta, StoryFn } from '@storybook/vue3';
import VLoginView from './VLoginView.vue';

export default {
  title: 'App/VLoginView',
  component: VLoginView,
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
