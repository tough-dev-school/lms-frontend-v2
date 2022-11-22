import type { Meta, Story } from '@storybook/vue3';
import VAnswer from '@/components/VAnswer.vue';
import { getAnswerData } from '@/mocks/homework';

export default {
  title: 'Answer/VAnswer',
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
  answer: getAnswerData(),
};
