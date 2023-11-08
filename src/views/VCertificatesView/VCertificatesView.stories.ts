import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificatesView from './VCertificatesView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useDiplomas from '@/stores/diplomas';
import { mockDiplomaSet, STATIC_DIPLOMAS } from '@/mocks/mockDiploma';
import { flatten } from 'lodash';

export default {
  title: 'App/VCertificatesView',
  component: VCertificatesView,
  decorators: [defaultLayoutDecorator],
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
        const diplomas = useDiplomas();
        diplomas.items = flatten(
          STATIC_DIPLOMAS.map((diploma) => mockDiplomaSet(diploma)),
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
        const diplomas = useDiplomas();
        diplomas.items = [];
      },
      template: '<story />',
    }),
  ],
};
