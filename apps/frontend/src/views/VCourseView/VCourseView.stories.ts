import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCourseView from './VCourseView.vue';
import {
  COURSE,
  COURSE_WITHOUT_EXTRA_INFO,
  LESSON_MATERIAL,
  MODULES,
} from '@/mocks/courses';
import type { ModuleWithLesson } from '@/types';

export default {
  title: 'App/VCourseView',
  component: VCourseView,
  parameters: { layout: 'fullscreen' },
} as Meta;

const MODULES_WITH_LESSONS: ModuleWithLesson[] = MODULES.map((module) => ({
  ...module,
  onlyLesson:
    module.lesson_count === 1 && module.has_started ? LESSON_MATERIAL : null,
}));

const Template: StoryFn = (args) => ({
  components: { VCourseView },
  setup() {
    return { args };
  },
  template: '<VCourseView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    courseId: COURSE.id,
    study: COURSE,
    modules: MODULES_WITH_LESSONS,
  },
};

export const Empty = {
  render: Template,
  args: {
    courseId: COURSE.id,
    study: COURSE,
    modules: [],
  },
};

export const WithoutExtraInfo = {
  render: Template,
  args: {
    courseId: COURSE_WITHOUT_EXTRA_INFO.id,
    study: COURSE_WITHOUT_EXTRA_INFO,
    modules: MODULES_WITH_LESSONS,
  },
};

// The course is not among the purchased ones, the page still shows its modules
export const UnknownCourse = {
  render: Template,
  args: {
    courseId: COURSE.id,
    study: null,
    modules: MODULES_WITH_LESSONS,
  },
};
