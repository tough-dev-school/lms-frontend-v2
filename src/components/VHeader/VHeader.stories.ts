import type { Meta, StoryFn } from '@storybook/vue3';
import VHeader from './VHeader.vue';

export default {
  title: 'VHeader',
  component: VHeader,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHeader },
  setup() {
    return { args };
  },
  template: '<VHeader v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
