import type { Meta, StoryFn } from '@storybook/vue3';

import { VCertificate } from '@/components/VCertificate';
import { mockDiplomaData } from '@/mocks/mockDiploma';

export default {
  component: VCertificate,
  title: 'UI/VCertificate',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificate },
  setup() {
    return { args };
  },
  template: '<VCertificate v-bind="args"/>',
});

export const En = {
  args: {
    certificate: { ...mockDiplomaData(), language: 'EN' },
  },

  render: Template,
};

export const Ru = {
  args: {
    certificate: { ...mockDiplomaData(), language: 'RU' },
  },

  render: Template,
};
