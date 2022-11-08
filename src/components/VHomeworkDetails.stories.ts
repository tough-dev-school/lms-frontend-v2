import type { Meta, Story } from '@storybook/vue3';
import VHomeworkDetails from '@/components/VHomeworkDetails.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/VHomeworkDetails',
  component: VHomeworkDetails,
} as Meta;

const Template: Story = (args) => ({
  components: { VHomeworkDetails },
  setup() {
    return { args };
  },
  template: '<VHomeworkDetails v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  task: faker.lorem.paragraphs(),
};
