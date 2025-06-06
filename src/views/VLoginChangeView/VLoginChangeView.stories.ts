import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoginChangeView from './VLoginChangeView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VLoginChangeView',
  component: VLoginChangeView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
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
