import type { Meta, StoryFn } from '@storybook/vue3';
import { ALLOWED_REACTIONS, MAX_REACTIONS, VReactionsPalette } from '.';
import { VCard } from '@/components/VCard';
import { faker } from '@faker-js/faker';

export default {
  title: 'Reactions/VReactionsPalette',
  component: VReactionsPalette,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VReactionsPalette, VCard },
  setup() {
    return { args };
  },
  argTypes: {
    usedReactions: { control: 'object' },
  },
  template:
    '<VCard class="flex gap-8"><VReactionsPalette v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
};

export const Exclude = {
  render: Template,
  args: {
    usedReactions: faker.helpers.arrayElements(
      ALLOWED_REACTIONS,
      MAX_REACTIONS - 1,
    ),
  },
};
