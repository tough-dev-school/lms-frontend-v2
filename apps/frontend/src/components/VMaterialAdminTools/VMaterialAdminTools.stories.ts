import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VMaterialAdminTools from '@/components/VMaterialAdminTools/VMaterialAdminTools.vue';
import { MATERIAL } from '@/mocks/courses';

const meta = {
  title: 'Material/VMaterialAdminTools',
  component: VMaterialAdminTools,
  args: {
    materialId: MATERIAL.id,
    initialStatus: null,
  },
} satisfies Meta<typeof VMaterialAdminTools>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UpToDate: Story = {
  args: {
    initialStatus: {
      fetch_started: '2025-11-12T08:30:12Z',
      fetch_complete: '2025-11-12T08:30:19Z',
    },
  },
};

export const NeverFetched: Story = {
  args: {
    initialStatus: {
      fetch_started: null,
      fetch_complete: null,
    },
  },
};

// The component polls the status every second while an update is in progress
export const UpdateInProgress: Story = {
  args: {
    initialStatus: {
      fetch_started: '2025-11-12T08:35:40Z',
      fetch_complete: '2025-11-12T08:30:19Z',
    },
  },
};
