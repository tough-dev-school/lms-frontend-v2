import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VNotionView from './VNotionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterialSerializer';
import { materialsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const MOCK_MATERIAL_ID = 'cf1379bf-bf5a-41f9-942f-31dd4253c178';
const NOT_FOUND_MATERIAL_ID = 'not-found-material-id';

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    const queryClient = useQueryClient();

    if (args.materialId === MOCK_MATERIAL_ID) {
      queryClient.setQueryData(
        materialsKeys.materials(MOCK_MATERIAL_ID),
        mockMaterial(),
      );
    } else {
      queryClient.setQueryData(materialsKeys.materials(args.materialId), null);
    }

    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    materialId: MOCK_MATERIAL_ID,
  },
};

export const Empty = {
  render: Template,
  args: {
    materialId: NOT_FOUND_MATERIAL_ID,
  },
};
