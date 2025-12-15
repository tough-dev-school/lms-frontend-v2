import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { createDiploma, LanguageEnum } from '@/api';
import type { Diploma } from '@/api';

export default {
  title: 'UI/VCertificateCard',
  component: VCertificateCard,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateCard },
  setup() {
    return { args };
  },
  template: '<VCertificateCard v-bind="args">This is card</VCertificateCard>',
});

const createDiplomaSet = (payload: Diploma): Diploma[] => {
  return Object.values(LanguageEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: {
        name: payload.course.name,
        product_name: payload.course.product_name,
        name_international: payload.course.name_international,
        tariff_name: payload.course.tariff_name,
      },
    };
  });
};

const diplomas = createDiplomaSet(createDiploma());

export const Default = {
  render: Template,

  args: {
    course: diplomas[0].course.product_name,
    certificates: diplomas.map((diploma) => {
      diploma.image = 'https://picsum.photos/1480/1048';
      return diploma;
    }),
  },
};
