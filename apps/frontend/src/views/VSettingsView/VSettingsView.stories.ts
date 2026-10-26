import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VSettingsView from './VSettingsView.vue';
import { NEW_STUDENT } from '@/mocks/users';

const meta = {
  title: 'App/VSettingsView',
  component: VSettingsView,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof VSettingsView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyProfile: Story = {
  parameters: { inertia: { props: { user: NEW_STUDENT } } },
};
