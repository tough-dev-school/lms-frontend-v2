import type { Meta, Story } from '@storybook/vue3';
import VHtmlContent from '@/components/VHtmlContent.vue';
import { contentHtml } from '@/mocks/homework';

export default {
  title: 'Answer/VHtmlContent',
  component: VHtmlContent,
} as Meta;

const Template: Story = (args) => ({
  components: { VHtmlContent },
  setup() {
    return { args };
  },
  template: '<VHtmlContent v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  content: contentHtml,
};
