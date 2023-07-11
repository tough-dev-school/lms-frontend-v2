import type { Meta, StoryFn } from '@storybook/vue3';
import { VCertificatesView } from '.';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import useDiplomas from '@/stores/diplomas';
import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';
import { faker } from '@faker-js/faker';
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
          faker.helpers.multiple(() => mockDiplomaSet(mockDiplomaData()), {
            count: 5,
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
        const diplomas = useDiplomas();
        diplomas.items = [];
      },
      template: '<story />',
    }),
  ],
};
