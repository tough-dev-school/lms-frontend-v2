import type { Meta, StoryFn } from '@storybook/vue3';

import { VFloat } from '@/components/VFloat';

export default {
  component: VFloat,
  title: 'UI/VFloat',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VFloat },
  setup() {
    return { args };
  },
  template: '<VFloat v-bind="args">Floating tip!</VFloat>',
});

export const Default = {
  args: {},
  render: Template,
};
