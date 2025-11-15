import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VCertificateCard from '@/components/VCertificateCard/VCertificateCard.vue';
import { createDiploma } from '@/api/generated/mocks';
import { languageEnumEnum } from '@/api/generated/types';
import type { Diploma } from '@/api/generated/types';

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
  return Object.values(languageEnumEnum).map((locale) => {
    return {
      ...payload,
      language: locale,
      course: { product_name: payload.course.product_name },
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
