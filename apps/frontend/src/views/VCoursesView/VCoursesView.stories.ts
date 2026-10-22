import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCoursesView from './VCoursesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { purchasedCoursesListQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { COURSE, COURSES, COURSE_WITH_LONG_NAME } from '@/mocks/courses';

export default {
  title: 'App/VCoursesView',
  component: VCoursesView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCoursesView },
  setup() {
    useQueryClient().setQueryData(
      purchasedCoursesListQueryKey({ page_size: 100 }),
      { results: args.studies },
    );
    return { args };
  },
  template: '<VCoursesView />',
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
