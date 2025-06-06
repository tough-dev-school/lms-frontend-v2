import type { Meta, StoryFn } from '@storybook/vue3';
import VMailSentView from './VMailSentView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VMailSentView',
  component: VMailSentView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
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
  args: {
    email: 'test@test.com',
  },
};
