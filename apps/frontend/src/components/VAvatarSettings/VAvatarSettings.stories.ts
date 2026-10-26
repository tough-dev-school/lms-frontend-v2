import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VAvatarSettings from '@/components/VAvatarSettings/VAvatarSettings.vue';
import { STUDENT } from '@/mocks/users';

const meta = {
  title: 'Settings/VAvatarSettings',
  component: VAvatarSettings,
} satisfies Meta<typeof VAvatarSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { inertia: { props: { user: STUDENT } } },
};
