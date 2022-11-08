import type { Meta, Story } from '@storybook/vue3';
import VFeedbackGuide from '@/components/VFeedbackGuide.vue';

export default {
  title: 'UI/FeedbackGuide',
  component: FeedbackGuide,
} as Meta;

const Template: Story = (args) => ({
  components: { FeedbackGuide },
  setup() {
    return { args };
  },
  template: '<FeedbackGuide v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
