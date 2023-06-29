import type { Meta, StoryFn } from '@storybook/vue3';
import { VReactions } from '.';
import { VCard } from '@/components/VCard';
import { mockReactionsData } from './mocks/mockReactionsData';

export default {
  title: 'Reactions/VReactions',
  component: VReactions,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VReactions, VCard },
  setup() {
    return { args };
  },
  argTypes: {
    reactions: { control: 'object' },
  },
  template:
    '<VCard class="flex justify-start flex-wrap items-start gap-x-8 gap-y-16 pt-16"><VReactions v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
  args: { reactions: mockReactionsData() },
};
