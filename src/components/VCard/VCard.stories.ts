import type { Meta, StoryFn } from '@storybook/vue3';
import { VCard } from '@/components/VCard';

export default {
  title: 'UI/VCard',
  component: VCard,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCard },
  setup() {
    return { args };
  },
  template: '<VCard v-bind="args">This is card</VCard>',
});

export const Default = {
  render: Template,
  args: {},
};
