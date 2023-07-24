import type { Meta, StoryFn } from '@storybook/vue3';

import { mockAnswer } from '@/mocks/mockAnswer';
import { STATIC_AUTHOR_2, STATIC_AUTHOR_3 } from '@/mocks/mockAuthor';
import { STATIC_REACTIONS } from '@/mocks/mockReaction';
import useHomework from '@/stores/homework';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VHomeworkExpertView } from '.';

export default {
  component: VHomeworkExpertView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VHomeworkExpertView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkExpertView },
  setup() {
    const homework = useHomework();
    const answers = [
      mockAnswer({
        author: STATIC_AUTHOR_2,
        reactions: STATIC_REACTIONS,
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
