import type { Meta, StoryFn } from '@storybook/vue3';

import { VCard } from '@/components/VCard';
import { faker } from '@faker-js/faker';

import { ALLOWED_REACTIONS, MAX_REACTIONS, VReactionsPalette } from '.';

export default {
  component: VReactionsPalette,
  title: 'Reactions/VReactionsPalette',
} as Meta;

const Template: StoryFn = (args) => ({
  argTypes: {
    usedReactions: { control: 'object' },
  },
  components: { VCard, VReactionsPalette },
  setup() {
    return { args };
  },
  template:
    '<VCard class="flex gap-8"><VReactionsPalette v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
};

export const Exclude = {
  args: {
    usedReactions: faker.helpers.arrayElements(
      ALLOWED_REACTIONS,
      MAX_REACTIONS - 1,
    ),
  },
  render: Template,
};
