import type { Meta, Story } from '@storybook/vue3';
import VPost from '@/components/VPost.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/Post',
  component: Post,
} as Meta;

const Template: Story = (args) => ({
  components: { Post },
  setup() {
    return { args };
  },
  template: '<Post v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  content: faker.lorem.paragraphs(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  date: faker.date.past(),
};
