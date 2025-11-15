import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockDiplomaSet, STATIC_DIPLOMAS } from '@/mocks/mockDiploma';
import { flatten } from 'lodash-es';
import { diplomasListQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'App/VCertificatesView',
  component: VCertificatesView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificatesView },
  setup() {
    return { args };
  },
  template: '<VCertificatesView v-bind="args" />',
});

export const Default = {
  render: Template,
  decorators: [
    () => ({
      setup() {
        const queryClient = useQueryClient();

        queryClient.setQueryData(
          diplomasListQueryKey({ page_size: 100 }),
          () => ({
            results: flatten(
              STATIC_DIPLOMAS.map((diploma) => mockDiplomaSet(diploma)),
            ),
          }),
        );
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

        queryClient.setQueryData(
          diplomasListQueryKey({ page_size: 100 }),
          () => ({ results: [] }),
        );
      },
      template: '<story />',
    }),
  ],
};
