import type { Meta, Story } from '@storybook/vue3';
import VCertificateCard from '@/components/VCertificateCard.vue';
import { getDiplomasData } from '@/mocks/diplomas';

export default {
  title: 'UI/VCertificateCard',
  component: VCertificateCard,
} as Meta;

const Template: Story = (args) => ({
  components: { VCertificateCard },
  setup() {
    return { args };
  },
  template: '<VCertificateCard v-bind="args">This is card</VCertificateCard>',
});

const diplomas = getDiplomasData(1);

export const Default = Template.bind({});
Default.args = {
  course: diplomas[0].course.name,
  certificates: diplomas.map((diploma) => {
    diploma.image = 'https://picsum.photos/1480/1048';
    return diploma;
  }),
};
