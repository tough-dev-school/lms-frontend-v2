import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCoursesView from './VCoursesView.vue';
import { COURSE, COURSES, COURSE_WITH_LONG_NAME } from '@/mocks/courses';

export default {
  title: 'App/VCoursesView',
  component: VCoursesView,
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCoursesView },
  setup() {
    return { args };
  },
  template: '<VCoursesView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    studies: COURSES,
  },
};

export const SingleCourse = {
  render: Template,
  args: {
    studies: [COURSE],
  },
};

export const LongCourseName = {
  render: Template,
  args: {
    studies: [COURSE_WITH_LONG_NAME],
  },
};

export const Empty = {
  render: Template,
  args: {
    studies: [],
  },
};
