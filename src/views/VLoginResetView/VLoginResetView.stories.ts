import type { Meta, StoryFn } from '@storybook/vue3';
import VLoginResetView from './VLoginResetView.vue';

export default {
  title: 'App/VLoginResetView',
  component: VLoginResetView,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginResetView },
  setup() {
    return { args };
  },
  template: '<VLoginResetView v-bind="args" />',
});

export const Default = {
  render: Template,
};
