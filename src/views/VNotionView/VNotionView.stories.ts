import type { Meta, StoryFn } from '@storybook/vue3';
import VNotionView from './VNotionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockMaterial } from '@/mocks/mockMaterial';
import { materialsKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';
export default {
  title: 'App/VNotionView',
  component: VNotionView,
  decorators: [defaultLayoutDecorator],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VNotionView },
  setup() {
    return { args };
  },
  template: '<VNotionView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    forceNew: true,
  },
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();
        queryClient.setQueryData(materialsKeys.materials(''), mockMaterial());
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
        queryClient.setQueryData(materialsKeys.materials(''), undefined);
      },
      template: '<story />',
    }),
  ],
};
