import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMaterialAdminTools from '@/components/VMaterialAdminTools/VMaterialAdminTools.vue';
import { materialsStatusRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { MATERIAL } from '@/mocks/courses';

export default {
  title: 'Material/VMaterialAdminTools',
  component: VMaterialAdminTools,
  args: {
    materialId: MATERIAL.id,
  },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VMaterialAdminTools },
  setup() {
    useQueryClient().setQueryData(
      materialsStatusRetrieveQueryKey(args.materialId),
      args.status,
    );
    return { args };
  },
  template: '<VMaterialAdminTools :material-id="args.materialId" />',
});

export const UpToDate = {
  render: Template,
  args: {
    status: {
      fetch_started: '2025-11-12T08:30:12Z',
      fetch_complete: '2025-11-12T08:30:19Z',
    },
  },
};

export const NeverFetched = {
  render: Template,
  args: {
    status: {
      fetch_started: null,
      fetch_complete: null,
    },
  },
};

// The component polls the status every second while an update is in progress
export const UpdateInProgress = {
  render: Template,
  args: {
    status: {
      fetch_started: '2025-11-12T08:35:40Z',
      fetch_complete: '2025-11-12T08:30:19Z',
    },
  },
};
