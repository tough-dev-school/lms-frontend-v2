import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VSettingsView from './VSettingsView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { usersMeRetrieveQueryKey } from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import { NEW_STUDENT } from '@/mocks/users';

export default {
  title: 'App/VSettingsView',
  component: VSettingsView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = () => ({
  components: { VSettingsView },
  template: '<VSettingsView />',
});

export const Default = {
  render: Template,
};

export const EmptyProfile = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        useQueryClient().setQueryData(usersMeRetrieveQueryKey(), NEW_STUDENT);
      },
      template: '<story />',
    }),
  ],
};
