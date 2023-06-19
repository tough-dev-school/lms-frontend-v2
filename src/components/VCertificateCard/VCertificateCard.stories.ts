import type { Meta, StoryFn } from '@storybook/vue3';
import VCertificateCard from '@/components/VCertificateCard';
import { getDiplomasData } from '@/mocks/diplomas';

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

const diplomas = getDiplomasData(['Cool course']);

export const Default = {
  render: Template,

  args: {
    course: diplomas[0].course.name,
    certificates: diplomas.map((diploma) => {
      diploma.image = 'https://picsum.photos/1480/1048';
      return diploma;
    }),
  },
};
