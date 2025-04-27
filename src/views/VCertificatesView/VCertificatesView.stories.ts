import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { mockDiplomaSet, STATIC_DIPLOMAS } from '@/mocks/mockDiploma';
import { flatten } from 'lodash-es';
import { diplomasKeys } from '@/query';
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

        queryClient.setQueryData(diplomasKeys.lists(), () =>
          flatten(STATIC_DIPLOMAS.map((diploma) => mockDiplomaSet(diploma))),
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

        queryClient.setQueryData(diplomasKeys.lists(), () => []);
      },
      template: '<story />',
    }),
  ],
};
