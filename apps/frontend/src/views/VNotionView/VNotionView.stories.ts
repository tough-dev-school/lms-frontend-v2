import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VNotionView from './VNotionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterialSerializer';
import { mockLMSCourse } from '@/mocks/mockLMSCourse';
import { mockModule } from '@/mocks/mockModule';
import { materialsRetrieveQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import type { MaterialSerilizer } from '@/api/generated/types';

export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const MOCK_MATERIAL_ID = 'cf1379bf-bf5a-41f9-942f-31dd4253c178';
const NOT_FOUND_MATERIAL_ID = 'not-found-material-id';

// Static breadcrumbs data for consistent display
const STATIC_COURSE = mockLMSCourse({
  id: 1,
  name: 'Асинхронная архитектура',
});

const STATIC_MODULE = mockModule({
  id: 1,
  name: 'Введение в асинхронную архитектуру',
});

const STATIC_MATERIAL_DATA: MaterialSerilizer = {
  content: mockMaterial().content,
  breadcrumbs: {
    course: STATIC_COURSE,
    module: STATIC_MODULE,
    lesson: undefined,
  },
};

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    const queryClient = useQueryClient();

    if (args.materialId === MOCK_MATERIAL_ID) {
      queryClient.setQueryData(
        materialsRetrieveQueryKey(MOCK_MATERIAL_ID),
        STATIC_MATERIAL_DATA,
      );
    } else {
      queryClient.setQueryData(
        materialsRetrieveQueryKey(args.materialId),
        null,
      );
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
