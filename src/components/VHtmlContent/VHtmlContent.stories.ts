import type { Meta, StoryFn } from '@storybook/vue3';

import { VHtmlContent } from '@/components/VHtmlContent';
import { mockContent } from '@/mocks/mockContent';

export default {
  component: VHtmlContent,
  title: 'Answer/VHtmlContent',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHtmlContent },
  setup() {
    return { args };
  },
  template: '<VHtmlContent v-bind="args" />',
});

export const Default = {
  args: {
    content: mockContent(),
  },

  render: Template,
};
