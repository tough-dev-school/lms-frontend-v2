import type { Meta, StoryFn } from '@storybook/vue3';
import VFeedbackGuide from '@/components/VFeedbackGuide.vue';

export default {
  title: 'UI/VFeedbackGuide',
  component: VFeedbackGuide,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VFeedbackGuide },
  setup() {
    return { args };
  },
  template: '<VFeedbackGuide v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
