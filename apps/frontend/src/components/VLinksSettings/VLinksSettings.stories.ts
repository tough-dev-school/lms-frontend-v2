import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VLinksSettings from '@/components/VLinksSettings/VLinksSettings.vue';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

const meta = {
  title: 'Settings/VLinksSettings',
  component: VLinksSettings,
} satisfies Meta<typeof VLinksSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { inertia: { props: { user: STUDENT } } },
};

export const Empty: Story = {
  parameters: { inertia: { props: { user: NEW_STUDENT } } },
};
