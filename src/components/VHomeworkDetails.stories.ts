import type { Meta, Story } from '@storybook/vue3';
import VHomeworkDetails from '@/components/VHomeworkDetails.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/HomeworkDetails',
  component: HomeworkDetails,
} as Meta;

const Template: Story = (args) => ({
  components: { HomeworkDetails },
  setup() {
    return { args };
  },
  template: '<HomeworkDetails v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  task: faker.lorem.paragraphs(),
};
