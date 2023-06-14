import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeView from './VHomeView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VHomeView',
  component: VHomeView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeView },
  setup() {
    return { args };
  },
  template: '<VHomeView v-bind="args" />',
});

export const Default = {
  render: Template,
};
