import type { Meta, StoryFn } from '@storybook/vue3';

import { VAnswer } from '@/components/VAnswer';
import { mockAnswer } from '@/mocks/mockAnswer';
import { STATIC_AUTHOR_1 } from '@/mocks/mockAuthor';
import { USER_1 } from '@/mocks/mockUserId';
import useUser from '@/stores/user';

export default {
  component: VAnswer,
  title: 'Answer/VAnswer',
} as Meta;

const userId = USER_1;
const answer = mockAnswer();
const ownAnswer = { ...answer, author: STATIC_AUTHOR_1 };

const Template: StoryFn = (args) => ({
  components: { VAnswer },
  setup() {
    const user = useUser();

    user.$patch({
      uuid: userId,
    });

    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = {
  args: {
    answer,
  },

  render: Template,
};

export const Own = {
  args: {
    answer: ownAnswer,
  },

  render: Template,
};

// #TODO Add stories for OWN answers (=disabled reactions)
