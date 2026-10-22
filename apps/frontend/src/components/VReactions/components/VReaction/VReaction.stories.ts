import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VReaction from './VReaction.vue';
import VCard from '@/components/VCard/VCard.vue';
import { ReactionEmoji } from '@/components/VReactions/VReactions.vue';
import { createReactions } from '@/mocks/homework';
import {
  ANONYMOUS_CLASSMATE,
  CLASSMATE_1,
  CLASSMATE_2,
  CLASSMATE_3,
  MENTOR,
  STUDENT,
  STUDENT_SAFE,
} from '@/mocks/users';

const ANSWER_SLUG = 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091';

export default {
  title: 'Reactions/VReaction',
  component: VReaction,
  args: {
    userId: STUDENT.uuid,
    emoji: ReactionEmoji.FIRE,
    disabled: false,
  },
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
    reactions: createReactions(ANSWER_SLUG, [
      [ReactionEmoji.FIRE, CLASSMATE_1],
      [ReactionEmoji.FIRE, CLASSMATE_2],
      [ReactionEmoji.FIRE, MENTOR],
    ]),
  },
};

export const Empty = {
  render: Template,
  args: {
    reactions: [],
  },
};

export const Own = {
  render: Template,
  args: {
    reactions: createReactions(ANSWER_SLUG, [
      [ReactionEmoji.FIRE, STUDENT_SAFE],
      [ReactionEmoji.FIRE, CLASSMATE_1],
      [ReactionEmoji.FIRE, CLASSMATE_3],
    ]),
  },
};

export const ManyAuthors = {
  render: Template,
  args: {
    reactions: createReactions(ANSWER_SLUG, [
      [ReactionEmoji.FIRE, CLASSMATE_1],
      [ReactionEmoji.FIRE, CLASSMATE_2],
      [ReactionEmoji.FIRE, CLASSMATE_3],
      [ReactionEmoji.FIRE, ANONYMOUS_CLASSMATE],
      [ReactionEmoji.FIRE, MENTOR],
      [ReactionEmoji.FIRE, STUDENT_SAFE],
    ]),
  },
};

export const Disabled = {
  render: Template,
  args: {
    reactions: createReactions(ANSWER_SLUG, [
      [ReactionEmoji.FIRE, CLASSMATE_1],
      [ReactionEmoji.FIRE, CLASSMATE_2],
    ]),
    disabled: true,
  },
};
