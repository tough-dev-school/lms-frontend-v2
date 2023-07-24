import type { Meta, StoryFn } from '@storybook/vue3';

import { VCertificateCard } from '@/components/VCertificateCard';
import { mockDiplomaData, mockDiplomaSet } from '@/mocks/mockDiploma';

export default {
  component: VCertificateCard,
  title: 'UI/VCertificateCard',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VCertificateCard },
  setup() {
    return { args };
  },
  template: '<VCertificateCard v-bind="args">This is card</VCertificateCard>',
});

const diplomas = mockDiplomaSet(mockDiplomaData());

export const Default = {
  args: {
    certificates: diplomas.map((diploma) => {
      diploma.image = 'https://picsum.photos/1480/1048';
      return diploma;
    }),
    course: diplomas[0].course.name,
  },

  render: Template,
};
