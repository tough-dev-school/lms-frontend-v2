import type { Meta, StoryObj } from '@storybook/vue3';
import VLogo from './VLogo.vue';

export default {
  title: 'VLogo',
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
