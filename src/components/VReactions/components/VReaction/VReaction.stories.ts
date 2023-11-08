import type { Meta, StoryFn } from '@storybook/vue3';
import { VReaction } from '.';
import VCard from '@/components/VCard/VCard.vue';
import { mockReactionsData } from '@/components/VReactions/mocks/mockReactionsData';
import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '@/components/VReactions';

const userId = faker.string.uuid();
const emoji = faker.helpers.arrayElement(ALLOWED_REACTIONS);

export default {
  title: 'Reactions/VReaction',
  component: VReaction,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VReaction, VCard },
  setup() {
    return { args };
  },
  template: '<VCard><VReaction v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
  args: {
    userId,
    emoji,
    reactions: mockReactionsData(),
  },
};

export const Own = {
  render: Template,
  args: {
    userId,
    emoji,
    reactions: [
      ...mockReactionsData(1).map((reaction) => {
        return { ...reaction, author: { ...reaction.author, uuid: userId } };
      }),
      ...mockReactionsData(3),
    ],
  },
};

export const Disabled = {
  render: Template,
  args: {
    userId,
    emoji,
    reactions: mockReactionsData(),
    disabled: true,
  },
};
