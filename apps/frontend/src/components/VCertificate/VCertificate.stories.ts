import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificate from '@/components/VCertificate/VCertificate.vue';
import { createDiploma } from '@/api/generated';

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
    certificate: { ...createDiploma(), language: 'EN' },
  },
};

export const Ru = {
  render: Template,

  args: {
    certificate: { ...createDiploma(), language: 'RU' },
  },
};
