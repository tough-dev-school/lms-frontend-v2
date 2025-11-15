import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VReaction from './VReaction.vue';
import VCard from '@/components/VCard/VCard.vue';
import { faker } from '@faker-js/faker';
import { ALLOWED_REACTIONS } from '@/components/VReactions/VReactions.vue';
import { createReactionDetailed, createUserSafe } from '@/api/generated/mocks';
import { times } from 'lodash-es';

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
    reactions: times(faker.number.int({ min: 1, max: 10 }), () =>
      createReactionDetailed(),
    ),
  },
};

export const Own = {
  render: Template,
  args: {
    userId,
    emoji,
    reactions: [
      ...times(1, () =>
        createReactionDetailed({
          author: createUserSafe({
            uuid: userId,
          }),
        }),
      ),
      ...times(3, () => createReactionDetailed()),
    ],
  },
};

export const Disabled = {
  render: Template,
  args: {
    userId,
    emoji,
    reactions: times(faker.number.int({ min: 1, max: 10 }), () =>
      createReactionDetailed(),
    ),
    disabled: true,
  },
};
