import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VLoader from '@/components/VLoader/VLoader.vue';

export default {
  title: 'UI/VLoader',
  component: VLoader,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VLoader },
  setup() {
    return { args };
  },
  template: '<VLoader v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
