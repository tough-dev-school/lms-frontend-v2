import type { Meta, StoryFn } from '@storybook/vue3';
import VSettingsView from './VSettingsView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';

export default {
  title: 'App/VSettingsView',
  component: VSettingsView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = () => ({
  components: { VSettingsView },
  template: '<VSettingsView v-bind="args" />',
});

export const Default = {
  render: Template,
};
