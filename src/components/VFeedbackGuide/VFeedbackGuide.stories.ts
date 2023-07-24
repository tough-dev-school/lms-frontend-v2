import type { Meta, StoryFn } from '@storybook/vue3';

import { VFeedbackGuide } from '@/components/VFeedbackGuide';

export default {
  component: VFeedbackGuide,
  title: 'UI/VFeedbackGuide',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VFeedbackGuide },
  setup() {
    return { args };
  },
  template: '<VFeedbackGuide v-bind="args" />',
});

export const Default = {
  args: {},
  render: Template,
};
