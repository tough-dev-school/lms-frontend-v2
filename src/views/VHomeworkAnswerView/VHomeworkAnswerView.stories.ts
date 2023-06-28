import type { Meta, StoryFn } from '@storybook/vue3';
import { VHomeworkAnswerView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useHomework from '@/stores/homework';
import type { Comment } from '@/types/homework';
import { userId1 } from '@/mocks/mockUserId';
import { mockThread } from '@/mocks/mockThread';
import { mockAnswer } from '@/mocks/mockAnswer';
import { mockContent } from '@/mocks/mockContent';
import { mockAuthor } from '@/mocks/mockAuthor';
import { mockComment } from '@/mocks/mockComment';
import { mockComments } from '@/mocks/mockComments';

export default {
  title: 'App/VHomeworkAnswerView',
  component: VHomeworkAnswerView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeworkAnswerView },
  setup() {
    const homework = useHomework();
    const answers = [
      mockThread(mockAnswer({ text: mockContent(), author: mockAuthor() })),
    ];

    const patchComment = (value: Comment): Comment => {
      value.author = mockAuthor();

      return value;
    };

    const getBranch = () => {
      const level1 = [mockComment(answers[0])].map(patchComment)[0];
      const level2 = mockComments(level1).descendants.map(patchComment);
      const level3 = mockComments(level2[0]).descendants.map(patchComment);

      level1.descendants = level2;
      level2[0].descendants = level3;

      return level1;
    };

    answers[0].descendants = [
      // comment with formatting
      {
        ...mockComment(answers[0]),
        ...mockAnswer({ text: mockContent(), author: mockAuthor() }),
      },
      // own comment
      {
        ...mockComment(answers[0]),
        author: { ...mockAuthor(), uuid: mockUserId(USER_1) },
      },
      // comment branch
      getBranch(),
    ];

    homework.$patch({
      answers: answers,
    });

    return { args };
  },
  template: '<VHomeworkAnswerView v-bind="args" />',
});

export const Default = {
  render: Template,
};
