import type { Meta, Story } from '@storybook/vue3';
import VCertificate from '@/components/VCertificate.vue';
import { getDiplomaData } from '@/mocks/diplomas';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/VCertificate',
  component: VCertificate,
} as Meta;

const Template: Story = (args) => ({
  components: { VCertificate },
  setup() {
    return { args };
  },
  template: '<VCertificate v-bind="args"/>',
});

export const En = Template.bind({});
En.args = {
  certificate: getDiplomaData(faker.commerce.productName(), 'EN'),
};

export const Ru = Template.bind({});
Ru.args = {
  certificate: getDiplomaData(faker.commerce.productName(), 'RU'),
};
