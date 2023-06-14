import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeworkAnswerView from './VHomeworkAnswerView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  getAnswerData,
  getCommentData,
  getCommentsData,
  getThreadData,
  contentHtml,
  authorData,
} from '@/mocks/homework';
import useHomework from '@/stores/homework';
import type { Comment } from '@/types/homework';
import { userId } from '@/mocks/userId';

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
      getThreadData(
        getAnswerData({ content: contentHtml, author: authorData }),
      ),
    ];

    const patchComment = (value: Comment): Comment => {
      value.author = authorData;

      return value;
    };

    const getBranch = () => {
      const level1 = [getCommentData(answers[0])].map(patchComment)[0];
      const level2 = getCommentsData(level1, 2).descendants.map(patchComment);
      const level3 = getCommentsData(level2[0], 2).descendants.map(
        patchComment,
      );

      level1.descendants = level2;
      level2[0].descendants = level3;

      return level1;
    };

    answers[0].descendants = [
      // comment with formatting
      {
        ...getCommentData(answers[0]),
        ...getAnswerData({ content: contentHtml, author: authorData }),
      },
      // own comment
      {
        ...getCommentData(answers[0]),
        author: { ...authorData, uuid: userId },
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
