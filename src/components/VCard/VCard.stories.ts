import type { Meta, StoryFn } from '@storybook/vue3';

import { VCard } from '@/components/VCard';

export default {
  component: VCard,
  title: 'UI/VCard',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template: '<VCard v-bind="args">This is card</VCard>',
});

export const Default = {
  args: {},
  render: Template,
};
