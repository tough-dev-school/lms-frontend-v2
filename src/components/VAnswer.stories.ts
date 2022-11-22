import type { Meta, Story } from '@storybook/vue3';
import VAnswer from '@/components/VAnswer.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/VAnswer',
  component: VAnswer,
} as Meta;

const Template: Story = (args) => ({
  components: { VAnswer },
  setup() {
    return { args };
  },
  template: '<VAnswer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  content: faker.lorem.paragraphs(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  date: faker.date.past(),
};
