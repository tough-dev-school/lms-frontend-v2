import type { Meta, StoryFn } from '@storybook/vue3';

import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

import { VSettingsView } from '.';

export default {
  component: VSettingsView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VSettingsView',
} as Meta;

const Template: StoryFn = () => ({
  components: { VSettingsView },
  template: '<VSettingsView v-bind="args" />',
});

export const Default = {
  render: Template,
};
