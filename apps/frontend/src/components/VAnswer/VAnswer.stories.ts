import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswer from '@/components/VAnswer/VAnswer.vue';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockUserSafe, STATIC_AUTHOR_1 } from '@/mocks/mockUserSafe';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const answer = mockAnswer();
const ownAnswer = { ...answer, author: STATIC_AUTHOR_1 };

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
    answer,
    user: mockUserSafe(),
  },
};

export const Own = {
  render: Template,

  args: {
    answer: ownAnswer,
    user: STATIC_AUTHOR_1,
  },
};

export const RankedAuthor = {
  render: Template,

  args: {
    answer: {
      ...answer,
      author: {
        ...answer.author,
        rank: 1,
        rank_label_color: '#FFE5CC',
      },
    },
    user: mockUserSafe(),
  },
};

export const RankedAuthorOwn = {
  render: Template,

  args: {
    answer: {
      ...ownAnswer,
      author: {
        ...STATIC_AUTHOR_1,
        rank: 1,
        rank_label_color: '#FFE5CC',
      },
    },
    user: STATIC_AUTHOR_1,
  },
};
