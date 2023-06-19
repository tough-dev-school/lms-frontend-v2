import type { Meta, StoryFn } from '@storybook/vue3';
import VHtmlContent from '@/components/VHtmlContent';
import { contentHtml } from '@/mocks/homework';

export default {
  title: 'Answer/VHtmlContent',
  component: VHtmlContent,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHtmlContent },
  setup() {
    return { args };
  },
  template: '<VHtmlContent v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    content: contentHtml,
  },
};
