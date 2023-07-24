import type { Meta, StoryFn } from '@storybook/vue3';

import { VCard } from '@/components/VCard';
import { ALLOWED_REACTIONS } from '@/components/VReactions';
import { mockReactionsData } from '@/components/VReactions/mocks/mockReactionsData';
import { faker } from '@faker-js/faker';

import { VReaction } from '.';

const userId = faker.string.uuid();
const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);

export default {
  component: VReaction,
  title: 'Reactions/VReaction',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCard, VReaction },
  setup() {
    return { args };
  },
  template: '<VCard><VReaction v-bind="args" /></VCard>',
});

export const Default = {
  args: {
    emoji,
    reactions: mockReactionsData(),
    userId,
  },
  render: Template,
};

export const Own = {
  args: {
    emoji,
    reactions: [
      ...mockReactionsData(1).map((reaction) => {
        return { ...reaction, author: { ...reaction.author, uuid: userId } };
      }),
      ...mockReactionsData(3),
    ],
    userId,
  },
  render: Template,
};

export const Disabled = {
  args: {
    disabled: true,
    emoji,
    reactions: mockReactionsData(),
    userId,
  },
  render: Template,
};
