import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificate from '@/components/VCertificate/VCertificate.vue';
import { DIPLOMAS_ASYNC_ARCH } from '@/mocks/certificates';
import { LanguageEnum } from '@/api/generated';

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
    certificate: DIPLOMAS_ASYNC_ARCH.find(
      (diploma) => diploma.language === LanguageEnum.EN,
    ),
  },
};

export const Ru = {
  render: Template,

  args: {
    certificate: DIPLOMAS_ASYNC_ARCH.find(
      (diploma) => diploma.language === LanguageEnum.RU,
    ),
  },
};
