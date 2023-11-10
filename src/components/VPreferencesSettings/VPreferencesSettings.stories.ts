import type { Meta, StoryObj } from '@storybook/vue3';
import VPreferencesSettings from './VPreferencesSettings.vue';

export default {
  title: 'VPreferencesSettings',
  component: VPreferencesSettings,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VPreferencesSettings },
  setup() {
    return { args };
  },
  template: '<VPreferencesSettings v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
