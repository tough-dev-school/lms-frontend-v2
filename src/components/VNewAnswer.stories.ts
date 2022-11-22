import type { Meta, Story } from '@storybook/vue3';
import VNewAnswer from '@/components/VNewAnswer.vue';
import { faker } from '@faker-js/faker';

export default {
  title: 'Answer/VNewAnswer',
  component: VNewAnswer,
} as Meta;

const Template: Story = (args) => ({
  components: { VNewAnswer },
  setup() {
    return { args };
  },
  template: '<VNewAnswer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  questionId: faker.datatype.uuid(),
  parentId: faker.datatype.uuid(),
};
