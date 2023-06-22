import type { Meta, StoryFn } from '@storybook/vue3';
import { VReaction } from '.';
import { VCard } from '@/components/VCard';
import { mockReactionsData } from '@/components/VReactions/mocks/mockReactionsData';
import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '../VReactionsPalette';

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
    emoji: faker.helpers.arrayElement(ALLOWED_REACTIONS),
    reactions: mockReactionsData(),
  },
};
