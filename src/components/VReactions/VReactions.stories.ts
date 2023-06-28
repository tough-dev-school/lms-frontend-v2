import type { Meta, StoryFn } from '@storybook/vue3';
import { VReactions } from '.';
import { VCard } from '@/components/VCard';
import { faker } from '@faker-js/faker';
import { mockReaction } from '@/mocks/mockReaction';

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
  template: '<VCard><VReactions v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
  args: { reactions: faker.helpers.multiple(mockReaction, { count: 15 }) },
};
