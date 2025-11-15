import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { createDiploma, createUserSafe } from '@/api/generated/mocks';
import { languageEnumEnum } from '@/api/generated/types';
import { flatten } from 'lodash-es';
import { diplomasListQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';
import type { Diploma } from '@/api/generated/types';

const STATIC_AUTHOR_1 = createUserSafe();

const createDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(languageEnumEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: { product_name: payload.course.product_name },
    };
  });
};

const STATIC_DIPLOMAS = [
  createDiploma({
    course: { product_name: 'Amazing Course' },
    student: STATIC_AUTHOR_1,
  }),
  createDiploma({
    course: { product_name: 'Cool Course' },
    student: STATIC_AUTHOR_1,
  }),
  createDiploma({
    course: { product_name: 'Pro Course' },
    student: STATIC_AUTHOR_1,
  }),
];

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
              STATIC_DIPLOMAS.map((diploma) => createDiplomaSet(diploma)),
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
