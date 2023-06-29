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
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  template:
    '<VCard class="flex justify-start flex-wrap items-start gap-x-8 gap-y-16 pt-16"><VReactions v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
  args: { reactions: mockReactionsData(), open: false, disabled: false },
};

export const Open = {
  render: Template,
  args: { reactions: mockReactionsData(), open: true, disabled: false },
};

export const Disabled = {
  render: Template,
  args: { reactions: mockReactionsData(), open: true, disabled: true },
};
