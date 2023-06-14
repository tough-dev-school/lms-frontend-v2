import type { Meta, StoryFn } from '@storybook/vue3';
import VLoginResetView from './VLoginResetView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VLoginResetView',
  component: VLoginResetView,
  decorators: [defaultLayoutDecorator],
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
