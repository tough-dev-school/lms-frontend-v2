import type { Meta, StoryFn } from '@storybook/vue3';
import { VReaction } from '.';
import { VCard } from '@/components/VCard';
import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '../VReactionsPalette';
import { mockReaction } from '@/mocks/mockReaction';

const userId = faker.datatype.uuid();

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
    emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
    reactions: faker.helpers.multiple(mockReaction, { count: 15 }),
  },
};

export const Own = {
  render: Template,
  args: {
    userId,
    emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
    reactions: [
      ...faker.helpers.multiple(mockReaction, { count: 1 }).map((reaction) => {
        return { ...reaction, author: { ...reaction.author, uuid: userId } };
      }),
      ...faker.helpers.multiple(mockReaction, { count: 3 }),
    ],
  },
};
