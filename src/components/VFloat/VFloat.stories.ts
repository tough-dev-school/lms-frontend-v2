import type { Meta, StoryFn } from '@storybook/vue3';
import { VFloat } from '@/components/VFloat';

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
