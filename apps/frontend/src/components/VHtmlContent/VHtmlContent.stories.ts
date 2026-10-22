import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHtmlContent from '@/components/VHtmlContent/VHtmlContent.vue';
import { MODULE_RESOURCES } from '@/mocks/courses';
import { SOLUTION_HTML } from '@/mocks/homework';
import { HTML_CONTENT } from '@/mocks/mockContent';

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
    html: SOLUTION_HTML,
  },
};

export const ModuleText = {
  render: Template,

  args: {
    html: MODULE_RESOURCES.text,
    enableLightbox: false,
  },
};

// Every element the editor can produce, to check typography in one place
export const AllElements = {
  render: Template,

  args: {
    html: HTML_CONTENT,
  },
};
