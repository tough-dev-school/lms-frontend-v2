import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VPreferencesSettings from '@/components/VPreferencesSettings/VPreferencesSettings.vue';

export default {
  title: 'Settings/VPreferencesSettings',
  component: VPreferencesSettings,
} as Meta;

const Template: StoryFn = () => ({
  components: { VPreferencesSettings },
  template: '<VPreferencesSettings />',
});

export const Default = {
  render: Template,
};

export const English = {
  render: Template,
  globals: { locale: 'en' },
};
