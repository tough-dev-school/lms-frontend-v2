import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMaterialView from './VMaterialView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  materialsRetrieveQueryKey,
  materialsStatusRetrieveQueryKey,
  usersMeRetrieveQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import type { MaterialSerilizer } from '@/api/generated';
import { mockNotionMaterial } from '@/mocks/mockNotionMaterial';
import { BREADCRUMBS, MATERIAL } from '@/mocks/courses';
import { STAFF } from '@/mocks/users';

export default {
  title: 'App/VMaterialView',
  component: VMaterialView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const MATERIAL_DATA: MaterialSerilizer = {
  breadcrumbs: BREADCRUMBS,
  content: mockNotionMaterial(),
};

const Template: StoryFn = (args) => ({
  components: { VMaterialView },
  setup() {
    useQueryClient().setQueryData(
      materialsRetrieveQueryKey(args.materialId),
      args.material,
    );
    return { args };
  },
  template: '<VMaterialView :material-id="args.materialId" />',
});

export const Default = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
};

// Staff can request a fresh copy of the page from Notion
export const AsStaff = {
  render: Template,
  args: {
    materialId: MATERIAL.id,
    material: MATERIAL_DATA,
  },
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();
        queryClient.setQueryData(usersMeRetrieveQueryKey(), STAFF);
        queryClient.setQueryData(materialsStatusRetrieveQueryKey(MATERIAL.id), {
          fetch_started: '2025-11-12T08:30:12Z',
          fetch_complete: '2025-11-12T08:30:19Z',
        });
      },
      template: '<story />',
    }),
  ],
};

export const Empty = {
  render: Template,
  args: {
    materialId: 'not-found-material-id',
    material: null,
  },
};
