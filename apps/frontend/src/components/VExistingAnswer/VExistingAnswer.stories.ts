import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VExistingAnswer from '@/components/VExistingAnswer/VExistingAnswer.vue';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import {
  LEGACY_ANSWER,
  STUDENT_ANSWER_WITHOUT_REPLIES,
} from '@/mocks/homework';
import { STUDENT, STUDENT_SAFE } from '@/mocks/users';

export default {
  title: 'Answer/VExistingAnswer',
  component: VExistingAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VExistingAnswer },
  setup() {
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), STUDENT);
    return { args };
  },
  template: '<VExistingAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    user: STUDENT_SAFE,
    answer: STUDENT_ANSWER_WITHOUT_REPLIES,
  },
};

export const LegacyText = {
  render: Template,

  args: {
    user: STUDENT_SAFE,
    answer: { ...LEGACY_ANSWER, author: STUDENT_SAFE, is_editable: true },
  },
};
