import type { Meta, StoryFn } from '@storybook/vue3';
import VAnswer from '@/components/VAnswer';
import { mockAnswer } from '@/mocks/mockAnswerDetailed';
import { USER_1 } from '@/mocks/mockUserId';
import { STATIC_AUTHOR_1 } from '@/mocks/mockUserSafe';
import { userKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'Answer/VAnswer',
  component: VAnswer,
} as Meta;

const userId = USER_1;
const answer = mockAnswer();
const ownAnswer = { ...answer, author: STATIC_AUTHOR_1 };

const Template: StoryFn = (args) => ({
  components: { VAnswer },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(userKeys.me(), {
      uuid: userId,
    });

    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    answer,
  },
};

export const Own = {
  render: Template,

  args: {
    answer: ownAnswer,
  },
};

// #TODO Add stories for OWN answers (=disabled reactions)
