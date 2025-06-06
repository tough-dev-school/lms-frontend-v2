import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoadingView from './VLoadingView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VLoadingView',
  component: VLoadingView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoadingView },
  setup() {
    return { args };
  },
  template: '<VLoadingView v-bind="args" />',
});

export const Default = {
  render: Template,
};
