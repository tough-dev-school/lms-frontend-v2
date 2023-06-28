import type { Meta, StoryFn } from '@storybook/vue3';
import { VHomeworkExpertView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useHomework from '@/stores/homework';

import { mockAnswer } from '@/mocks/mockAnswer';
import {
  STATIC_AUTHOR_1,
  STATIC_AUTHOR_2,
  STATIC_AUTHOR_3,
} from '@/mocks/mockAuthor';
import { mockReaction } from '@/mocks/mockReaction';
import { ReactionEmoji } from '@/types/homework';

export default {
  title: 'App/VHomeworkExpertView',
  component: VHomeworkExpertView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkExpertView },
  setup() {
    const homework = useHomework();
    const answers = [
      mockAnswer({
        author: STATIC_AUTHOR_2,
        reactions: [
          mockReaction({ author: STATIC_AUTHOR_2, emoji: ReactionEmoji.HAPPY }),
          mockReaction({ author: STATIC_AUTHOR_1, emoji: ReactionEmoji.HAPPY }),
          mockReaction({ author: STATIC_AUTHOR_1, emoji: ReactionEmoji.LIKE }),
        ],
      }),
      mockAnswer({
        author: STATIC_AUTHOR_3,
        hasDescendants: true,
        reactions: [],
      }),
    ];

    homework.$patch({
      answers: answers,
    });

    return { args };
  },
  template: '<VHomeworkExpertView v-bind="args" />',
});

export const Default = {
  render: Template,
};
