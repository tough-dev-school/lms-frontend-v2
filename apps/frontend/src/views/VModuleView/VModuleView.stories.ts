import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleView from './VModuleView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  purchasedCoursesListQueryKey,
  lmsModulesRetrieveQueryKey,
  lmsLessonsListQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import {
  COURSE,
  LESSONS,
  MODULE_EVENT_STORMING,
  MODULE_SCHEMA_EVOLUTION,
} from '@/mocks/courses';

export default {
  title: 'App/VModuleView',
  component: VModuleView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VModuleView },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(purchasedCoursesListQueryKey({ page_size: 100 }), {
      results: [COURSE],
    });
    queryClient.setQueryData(
      lmsModulesRetrieveQueryKey(args.module.id),
      args.module,
    );
    queryClient.setQueryData(
      lmsLessonsListQueryKey({ module: args.module.id, page_size: 1000 }),
      { results: args.lessons },
    );

    return { args };
  },
  template:
    '<VModuleView :course-id="args.courseId" :module-id="args.module.id" />',
});

export const Default = {
  render: Template,
  args: {
    courseId: COURSE.id,
    module: MODULE_EVENT_STORMING,
    lessons: LESSONS,
  },
};

export const Empty = {
  render: Template,
  args: {
    courseId: COURSE.id,
    module: MODULE_EVENT_STORMING,
    lessons: [],
  },
};

export const WithoutModuleText = {
  render: Template,
  args: {
    courseId: COURSE.id,
    module: MODULE_SCHEMA_EVOLUTION,
    lessons: LESSONS,
  },
};
