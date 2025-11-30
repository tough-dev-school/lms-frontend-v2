import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VMaterialView from './VMaterialView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  createMaterialSerilizer,
  createLMSCourse,
  createModule,
  createLessonPlain,
} from '@/api/generated/mocks';
import { materialsRetrieveQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import type { MaterialSerilizer } from '@/api/generated/types';

export default {
  title: 'App/VMaterialView',
  component: VMaterialView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const MOCK_MATERIAL_ID = 'cf1379bf-bf5a-41f9-942f-31dd4253c178';
const NOT_FOUND_MATERIAL_ID = 'not-found-material-id';

// Static breadcrumbs data for consistent display
const STATIC_COURSE = createLMSCourse({
  id: 1,
  name: 'Асинхронная архитектура',
});

const STATIC_MODULE = createModule({
  id: 1,
  name: 'Введение в асинхронную архитектуру',
});

const STATIC_MATERIAL_DATA: MaterialSerilizer = {
  content: createMaterialSerilizer().content,
  breadcrumbs: {
    course: STATIC_COURSE,
    module: STATIC_MODULE,
    lesson: createLessonPlain(),
  },
};

const Template: StoryFn = (args) => ({
  components: { VMaterialView },
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
