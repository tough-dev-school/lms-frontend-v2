import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeView from './VHomeView.vue';

export default {
  title: 'App/VHomeView',
  component: VHomeView,
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
