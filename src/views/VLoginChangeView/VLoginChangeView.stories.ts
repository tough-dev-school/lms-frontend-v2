import type { Meta, StoryFn } from '@storybook/vue3';
import VLoginChangeView from './VLoginChangeView.vue';

export default {
  title: 'App/VLoginChangeView',
  component: VLoginChangeView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoginChangeView },
  setup() {
    return { args };
  },
  template: '<VLoginChangeView v-bind="args" />',
});

export const Default = {
  render: Template,
};
