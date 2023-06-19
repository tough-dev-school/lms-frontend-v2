import type { Meta, StoryFn } from '@storybook/vue3';
import { VCertificate } from '@/components/VCertificate';
import { getDiplomaData } from '@/mocks/diplomas';

export default {
  title: 'UI/VCertificate',
  component: VCertificate,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificate },
  setup() {
    return { args };
  },
  template: '<VCertificate v-bind="args"/>',
});

export const En = {
  render: Template,

  args: {
    certificate: { ...getDiplomaData(), language: 'EN' },
  },
};

export const Ru = {
  render: Template,

  args: {
    certificate: { ...getDiplomaData(), language: 'RU' },
  },
};
