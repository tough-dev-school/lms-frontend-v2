import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAnswerContent from '@/components/VAnswerContent/VAnswerContent.vue';
import {
  CLASSMATE_ANSWER,
  LEGACY_ANSWER,
  STUDENT_ANSWER,
  htmlToContent,
} from '@/mocks/homework';
import { HTML_CONTENT } from '@/mocks/mockContent';

export default {
  title: 'Answer/VAnswerContent',
  component: VAnswerContent,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAnswerContent },
  setup() {
    return { args };
  },
  template: '<VAnswerContent v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    answer: STUDENT_ANSWER,
  },
};

export const WithQuote = {
  render: Template,
  args: {
    answer: CLASSMATE_ANSWER,
  },
};

export const AllElements = {
  render: Template,
  args: {
    answer: { ...STUDENT_ANSWER, content: htmlToContent(HTML_CONTENT) },
  },
};

// Answers sent before the switch to TipTap only have HTML in legacy_text
export const LegacyText = {
  render: Template,
  args: {
    answer: LEGACY_ANSWER,
  },
};
