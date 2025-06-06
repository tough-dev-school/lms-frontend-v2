import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLogo from './VLogo.vue';

export default {
  title: 'UI/VLogo',
  component: VLogo,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLogo },
  setup() {
    return { args };
  },
  template: '<VLogo v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
