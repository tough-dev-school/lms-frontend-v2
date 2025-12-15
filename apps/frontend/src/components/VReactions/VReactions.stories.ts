import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VReactions from './VReactions.vue';
import VCard from '@/components/VCard/VCard.vue';
import { faker } from '@faker-js/faker';
import { createReactionDetailed } from '@/api';

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
  args: {
    reactions: faker.helpers.multiple(createReactionDetailed, { count: 15 }),
    open: false,
    disabled: false,
  },
};

export const Open = {
  render: Template,
  args: {
    reactions: faker.helpers.multiple(createReactionDetailed, { count: 15 }),
    open: true,
    disabled: false,
  },
};

export const Disabled = {
  render: Template,
  args: {
    reactions: faker.helpers.multiple(createReactionDetailed, { count: 15 }),
    open: true,
    disabled: true,
  },
};
