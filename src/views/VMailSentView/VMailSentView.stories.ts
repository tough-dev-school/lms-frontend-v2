import type { Meta, StoryFn } from '@storybook/vue3';
import { VMailSentView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VMailSentView',
  component: VMailSentView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VMailSentView },
  setup() {
    return { args };
  },
  template: '<VMailSentView v-bind="args" />',
});

export const Default = {
  render: Template,
};
