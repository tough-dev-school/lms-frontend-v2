import type { Meta, StoryFn } from '@storybook/vue3';
import VHomeView from './VHomeView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { STATIC_STUDY } from '@/mocks/mockStudy';
import { studiesKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'App/VHomeView',
  component: VHomeView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VHomeView },
  setup() {
    return { args };
  },
  template: '<VHomeView v-bind="args" />',
});

export const Default = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();

        queryClient.setQueryData(studiesKeys.all(), [STATIC_STUDY]);
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

        queryClient.setQueryData(studiesKeys.all(), []);
      },
      template: '<story />',
    }),
  ],
};
