import type { Meta, StoryFn } from '@storybook/vue3';
import { VHomeworkExpertView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useHomework from '@/stores/homework';
import merge from 'lodash/merge';
import { mockAnswer } from '@/mocks/mockAnswer';

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
      mockAnswer(),
      merge({}, mockAnswer(), { hasDescendants: true }),
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
