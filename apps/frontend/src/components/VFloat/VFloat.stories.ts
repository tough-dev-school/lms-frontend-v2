import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VFloat from '@/components/VFloat/VFloat.vue';

export default {
  title: 'UI/VFloat',
  component: VFloat,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VFloat },
  setup() {
    return { args };
  },
  template: '<VFloat v-bind="args">Floating tip!</VFloat>',
});

export const Default = {
  render: Template,
  args: {},
};
