import HomeworkDetails from './HomeworkDetails.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/HomeworkDetails',
  component: HomeworkDetails,
};

const Template = (args) => ({
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
