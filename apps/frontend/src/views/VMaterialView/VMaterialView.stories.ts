import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VMaterialView from './VMaterialView.vue';
import type { MaterialSerilizer } from '@/api/generated';
import { mockNotionMaterial } from '@/mocks/mockNotionMaterial';
import { BREADCRUMBS, MATERIAL } from '@/mocks/courses';
import { STAFF } from '@/mocks/users';

const MATERIAL_DATA: MaterialSerilizer = {
  breadcrumbs: BREADCRUMBS,
  content: mockNotionMaterial(),
};

const meta = {
  title: 'App/VMaterialView',
  component: VMaterialView,
  parameters: { layout: 'fullscreen' },
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
    materialStatus: null,
  },
} satisfies Meta<typeof VMaterialView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Staff can request a fresh copy of the page from Notion
export const AsStaff: Story = {
  args: {
    materialStatus: {
      fetch_started: '2025-11-12T08:30:12Z',
      fetch_complete: '2025-11-12T08:30:19Z',
    },
  },
  parameters: {
    inertia: { props: { user: STAFF } },
  },
};

export const Empty: Story = {
  args: {
    materialId: 'not-found-material-id',
    material: null,
  },
};
