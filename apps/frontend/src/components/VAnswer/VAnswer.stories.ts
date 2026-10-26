import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import {
  ANONYMOUS_ANSWER,
  CLASSMATE_ANSWER,
  LEGACY_ANSWER,
  MENTOR_ANSWER,
  STUDENT_ANSWER,
  createAnswerFixture,
} from '@/mocks/homework';
import { LONG_NAME_CLASSMATE, MENTOR, STAFF } from '@/mocks/users';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswer },
  setup() {
    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer: CLASSMATE_ANSWER,
  },
};

export const Own = {
  render: Template,

  args: {
    answer: STUDENT_ANSWER,
  },
};

export const RankedAuthor = {
  render: Template,

  args: {
    answer: MENTOR_ANSWER,
  },
};

export const RankedAuthorOwn = {
  render: Template,

  args: {
    answer: MENTOR_ANSWER,
  },
  // The signed-in user is the mentor who wrote the answer
  parameters: {
    inertia: { props: { user: { ...STAFF, ...MENTOR } } },
  },
};

export const AnonymousAuthor = {
  render: Template,

  args: {
    answer: ANONYMOUS_ANSWER,
  },
};

export const LongAuthorName = {
  render: Template,

  args: {
    answer: { ...CLASSMATE_ANSWER, author: LONG_NAME_CLASSMATE },
  },
};

export const LegacyText = {
  render: Template,

  args: {
    answer: LEGACY_ANSWER,
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
  },
};
