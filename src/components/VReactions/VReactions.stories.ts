import type { Meta, StoryFn } from '@storybook/vue3';

import { VCard } from '@/components/VCard';
import { mockReaction } from '@/mocks/mockReaction';
import { faker } from '@faker-js/faker';

import { VReactions } from '.';

export default {
  component: VReactions,
  title: 'Reactions/VReactions',
} as Meta;

const Template: StoryFn = (args) => ({
  argTypes: {
    disabled: { control: 'boolean' },
    open: { control: 'boolean' },
    reactions: { control: 'object' },
  },
  components: { VCard, VReactions },
  setup() {
    return { args };
  },
  template:
    '<VCard class="flex justify-start flex-wrap items-start gap-x-8 gap-y-16 pt-16"><VReactions v-bind="args" /></VCard>',
});

export const Default = {
  args: {
    disabled: false,
    open: false,
    reactions: faker.helpers.multiple(mockReaction, { count: 15 }),
  },
  render: Template,
};

export const Open = {
  args: {
    disabled: false,
    open: true,
    reactions: faker.helpers.multiple(mockReaction, { count: 15 }),
  },
  render: Template,
};

export const Disabled = {
  args: {
    disabled: true,
    open: true,
    reactions: faker.helpers.multiple(mockReaction, { count: 15 }),
  },
  render: Template,
};
