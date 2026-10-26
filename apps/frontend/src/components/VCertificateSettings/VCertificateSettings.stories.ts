import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VCertificateSettings from '@/components/VCertificateSettings/VCertificateSettings.vue';
import { NEW_STUDENT, STUDENT } from '@/mocks/users';

const meta = {
  title: 'Settings/VCertificateSettings',
  component: VCertificateSettings,
} satisfies Meta<typeof VCertificateSettings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { inertia: { props: { user: STUDENT } } },
};

export const Empty: Story = {
  parameters: { inertia: { props: { user: NEW_STUDENT } } },
};
