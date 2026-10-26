import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VPreferencesSettings from '@/components/VPreferencesSettings/VPreferencesSettings.vue';

const meta = {
  title: 'Settings/VPreferencesSettings',
  component: VPreferencesSettings,
} satisfies Meta<typeof VPreferencesSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  globals: { locale: 'en' },
};

export const DarkTheme: Story = {
  parameters: { inertia: { props: { theme: 'dark' } } },
};
