import type { Meta, StoryFn } from '@storybook/vue3';
import VCoursesView from './VCoursesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { STATIC_STUDY } from '@/mocks/mockCourse';
import { studiesKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'App/VCoursesView',
  component: VCoursesView,
  decorators: [defaultLayoutDecorator],
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
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();
        queryClient.setQueryData(studiesKeys.lists(), [STATIC_STUDY]);
      },
      template: '<story />',
    }),
  ],
};

export const Empty = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();
        queryClient.setQueryData(studiesKeys.lists(), []);
      },
      template: '<story />',
    }),
  ],
};
