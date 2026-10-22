import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import {
  ANONYMOUS_ANSWER,
  CLASSMATE_ANSWER,
  LEGACY_ANSWER,
  MENTOR_ANSWER,
  STUDENT_ANSWER,
  createAnswerFixture,
} from '@/mocks/homework';
import {
  LONG_NAME_CLASSMATE,
  MENTOR,
  STUDENT,
  STUDENT_SAFE,
} from '@/mocks/users';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswer },
  setup() {
    // Reactions read the current user to highlight own reactions
    useQueryClient().setQueryData(usersMeRetrieveQueryKey(), STUDENT);
    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer: CLASSMATE_ANSWER,
    user: STUDENT_SAFE,
  },
};

export const Own = {
  render: Template,

  args: {
    answer: STUDENT_ANSWER,
    user: STUDENT_SAFE,
  },
};

export const RankedAuthor = {
  render: Template,

  args: {
    answer: MENTOR_ANSWER,
    user: STUDENT_SAFE,
  },
};

export const RankedAuthorOwn = {
  render: Template,

  args: {
    answer: MENTOR_ANSWER,
    user: MENTOR,
  },
};

export const AnonymousAuthor = {
  render: Template,

  args: {
    answer: ANONYMOUS_ANSWER,
    user: STUDENT_SAFE,
  },
};

export const LongAuthorName = {
  render: Template,

  args: {
    answer: { ...CLASSMATE_ANSWER, author: LONG_NAME_CLASSMATE },
    user: STUDENT_SAFE,
  },
};

export const LegacyText = {
  render: Template,

  args: {
    answer: LEGACY_ANSWER,
    user: STUDENT_SAFE,
  },
};

export const LongUnbrokenText = {
  render: Template,

  args: {
    answer: createAnswerFixture({
      slug: '9e3f4a6b-7c8d-4e0f-2a3b-4c5d6e7f8092',
      author: CLASSMATE_ANSWER.author,
      created: '2025-11-17T09:00:00Z',
      html: '<p>Ссылка на решение: https://example.com/docs/library-api-final-version-really-final-v3-do-not-edit?section=reservations&amp;revision=3458764612345678901</p>',
    }),
    user: STUDENT_SAFE,
  },
};
