import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
import { mockContent } from '@/api/generated/mocks';

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
    html: mockContent(),
  },
};
