import type { Meta, StoryFn } from '@storybook/vue3';

import { STATIC_DIPLOMAS, mockDiplomaSet } from '@/mocks/mockDiploma';
import useDiplomas from '@/stores/diplomas';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import { flatten } from 'lodash';

import { VCertificatesView } from '.';

export default {
  component: VCertificatesView,
  decorators: [defaultLayoutDecorator],
  title: 'App/VCertificatesView',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificatesView },
  setup() {
    return { args };
  },
  template: '<VCertificatesView v-bind="args" />',
});

export const Default = {
  decorators: [
    () => ({
      setup() {
        const diplomas = useDiplomas();
        diplomas.items = flatten(
          STATIC_DIPLOMAS.map((diploma) => mockDiplomaSet(diploma)),
        );
      },
      template: '<story />',
    }),
  ],
  render: Template,
};

export const Empty = {
  decorators: [
    () => ({
      setup() {
        const diplomas = useDiplomas();
        diplomas.items = [];
      },
      template: '<story />',
    }),
  ],
  render: Template,
};
