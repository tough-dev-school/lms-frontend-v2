import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VModuleView from './VModuleView.vue';
import {
  COURSE,
  LESSONS,
  MODULE_RESOURCES,
  MODULE_VERSIONING,
} from '@/mocks/courses';

export default {
  title: 'App/VModuleView',
  component: VModuleView,
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VModuleView },
  setup() {
    return { args };
  },
  template: '<VModuleView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    courseId: COURSE.id,
    courseName: COURSE.name,
    module: MODULE_RESOURCES,
    lessons: LESSONS,
  },
};

export const Empty = {
  render: Template,
  args: {
    courseId: COURSE.id,
    courseName: COURSE.name,
    module: MODULE_RESOURCES,
    lessons: [],
  },
};

export const WithoutModuleText = {
  render: Template,
  args: {
    courseId: COURSE.id,
    courseName: COURSE.name,
    module: MODULE_VERSIONING,
    lessons: LESSONS,
  },
};
