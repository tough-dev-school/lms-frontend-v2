import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  createDiploma,
  createUserSafe,
  LanguageEnum,
  diplomasListQueryKey,
} from '@/api';
import { flatten } from 'lodash-es';
import { useQueryClient } from '@tanstack/vue-query';
import type { Diploma } from '@/api';

const STATIC_AUTHOR_1 = createUserSafe();

const createDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(LanguageEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: {
        name: payload.course.name,
        name_international: payload.course.name_international,
        product_name: payload.course.product_name,
        tariff_name: payload.course.tariff_name,
      },
    };
  });
};

const STATIC_DIPLOMAS = [
  createDiploma({
    course: {
      name: 'Amazing Course',
      name_international: 'Amazing Course',
      product_name: 'Amazing Course',
      tariff_name: 'Amazing Course',
    },
    student: STATIC_AUTHOR_1,
  }),
  createDiploma({
    course: {
      name: 'Cool Course',
      name_international: 'Cool Course',
      product_name: 'Cool Course',
      tariff_name: 'Cool Course',
    },
    student: STATIC_AUTHOR_1,
  }),
  createDiploma({
    course: {
      name: 'Pro Course',
      name_international: 'Pro Course',
      product_name: 'Pro Course',
      tariff_name: 'Pro Course',
    },
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
