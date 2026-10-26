import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VReactions, { ReactionEmoji } from './VReactions.vue';
import VCard from '@/components/VCard/VCard.vue';
import { createReactions } from '@/mocks/homework';
import {
  ANONYMOUS_CLASSMATE,
  CLASSMATE_1,
  CLASSMATE_2,
  CLASSMATE_3,
  MENTOR,
  STUDENT_SAFE,
} from '@/mocks/users';

const ANSWER_SLUG = 'e0b4f5a7-8c9d-4e1f-2a3b-4c5d6e7f8091';

const REACTIONS = createReactions(ANSWER_SLUG, [
  [ReactionEmoji.FIRE, CLASSMATE_2],
  [ReactionEmoji.FIRE, MENTOR],
  [ReactionEmoji.FIRE, STUDENT_SAFE],
  [ReactionEmoji.LIKE, CLASSMATE_3],
  [ReactionEmoji.LIKE, ANONYMOUS_CLASSMATE],
  [ReactionEmoji.ROCKET, CLASSMATE_1],
  [ReactionEmoji.SEEN, MENTOR],
]);

// Students can leave up to three reactions on one answer
const MAX_OWN_REACTIONS = createReactions(ANSWER_SLUG, [
  [ReactionEmoji.FIRE, STUDENT_SAFE],
  [ReactionEmoji.LIKE, STUDENT_SAFE],
  [ReactionEmoji.HEART, STUDENT_SAFE],
  [ReactionEmoji.LIKE, CLASSMATE_3],
]);

export default {
  title: 'Reactions/VReactions',
  component: VReactions,
  args: {
    answerId: ANSWER_SLUG,
  },
  argTypes: {
    reactions: { control: 'object' },
    open: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VReactions, VCard },
  setup() {
    return { args };
  },
  template:
    '<VCard class="flex justify-start flex-wrap items-start gap-x-8 gap-y-16 pt-16"><VReactions v-bind="args" /></VCard>',
});

export const Default = {
  render: Template,
  args: {
    reactions: REACTIONS,
    open: false,
    disabled: false,
  },
};

export const Open = {
  render: Template,
  args: {
    reactions: REACTIONS,
    open: true,
    disabled: false,
  },
};

export const OwnLimitReached = {
  render: Template,
  args: {
    reactions: MAX_OWN_REACTIONS,
    open: true,
    disabled: false,
  },
};

export const Disabled = {
  render: Template,
  args: {
    reactions: REACTIONS,
    open: true,
    disabled: true,
  },
};
