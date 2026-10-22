import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCourseView from './VCourseView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  purchasedCoursesListQueryKey,
  lmsModulesListQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { COURSE, COURSE_WITHOUT_EXTRA_INFO, MODULES } from '@/mocks/courses';

export default {
  title: 'App/VCourseView',
  component: VCourseView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCourseView },
  setup() {
    const queryClient = useQueryClient();

    queryClient.setQueryData(purchasedCoursesListQueryKey({ page_size: 100 }), {
      results: [args.study],
    });
    queryClient.setQueryData(
      lmsModulesListQueryKey({ course: args.study.id, page_size: 100 }),
      { results: args.modules },
    );

    return { args };
  },
  template: '<VCourseView :course-id="args.study.id" />',
});

export const Default = {
  render: Template,
  args: {
    study: COURSE,
    modules: MODULES,
  },
};

export const Empty = {
  render: Template,
  args: {
    study: COURSE,
    modules: [],
  },
};

export const WithoutExtraInfo = {
  render: Template,
  args: {
    study: COURSE_WITHOUT_EXTRA_INFO,
    modules: MODULES,
  },
};
