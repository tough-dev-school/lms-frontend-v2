import type { Meta, StoryFn } from '@storybook/vue3';
import VNotionView from './VNotionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterialSerializer';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

const MOCK_MATERIAL_ID = 'cf1379bf-bf5a-41f9-942f-31dd4253c178';

export const Default = {
  render: Template,
  args: {
    materialId: MOCK_MATERIAL_ID,
    materialData: mockMaterial(),
  },
};

export const Empty = {
  render: Template,
  args: {
    materialId: MOCK_MATERIAL_ID,
    materialData: undefined,
  },
};
