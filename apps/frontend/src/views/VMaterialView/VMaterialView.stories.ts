import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMaterialView from './VMaterialView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterialSerializer';
import { mockLMSCourse } from '@/mocks/mockLMSCourse';
import { mockLessonPlain } from '@/mocks/mockLessonPlain';
import { mockModule } from '@/mocks/mockModule';
import { materialsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
import type { MaterialSerilizer } from '@/api/generated/generated-api';

export default {
  title: 'App/VMaterialView',
  component: VMaterialView,
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

const STATIC_LESSON = mockLessonPlain({
  id: 1,
});

const STATIC_MATERIAL_DATA: MaterialSerilizer = mockMaterial({
  breadcrumbs: {
    course: STATIC_COURSE,
    module: STATIC_MODULE,
    lesson: STATIC_LESSON,
  },
});

const Template: StoryFn = (args) => ({
  components: { VMaterialView },
  setup() {
    const queryClient = useQueryClient();

    if (args.materialId === MOCK_MATERIAL_ID) {
      queryClient.setQueryData(
        materialsKeys.materials(MOCK_MATERIAL_ID),
        STATIC_MATERIAL_DATA,
      );
    } else {
      queryClient.setQueryData(materialsKeys.materials(args.materialId), null);
    }

    return { args };
  },
  template: '<VMaterialView v-bind="args" />',
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
