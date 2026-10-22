import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { DIPLOMAS_REST_API } from '@/mocks/certificates';
import { LanguageEnum } from '@/api/generated';

export default {
  title: 'UI/VCertificateCard',
  component: VCertificateCard,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateCard },
  setup() {
    return { args };
  },
  template: '<VCertificateCard v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    course: DIPLOMAS_REST_API[0].course.product_name,
    certificates: DIPLOMAS_REST_API,
  },
};

export const SingleLanguage = {
  render: Template,

  args: {
    course: DIPLOMAS_REST_API[0].course.product_name,
    certificates: DIPLOMAS_REST_API.filter(
      (diploma) => diploma.language === LanguageEnum.RU,
    ),
  },
};
