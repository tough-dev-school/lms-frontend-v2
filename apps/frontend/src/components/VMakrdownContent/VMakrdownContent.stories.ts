import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMakrdownContent from '@/components/VMakrdownContent/VMakrdownContent.vue';
import { QUESTION, QUESTION_ERRORS } from '@/mocks/courses';

export default {
  title: 'Homework/VMarkdownContent',
  component: VMakrdownContent,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VMakrdownContent },
  setup() {
    return { args };
  },
  template: '<VMakrdownContent v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    markdown: QUESTION.markdown_text,
  },
};

export const Short = {
  render: Template,
  args: {
    markdown: QUESTION_ERRORS.markdown_text,
  },
};
