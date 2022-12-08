import type { Meta, Story } from '@storybook/vue3';
import VAnswerActions from '@/components/VAnswerActions.vue';
import dayjs from 'dayjs';

export default {
  title: 'UI/VAnswerActions',
  component: VAnswerActions,
} as Meta;

const Template: Story = (args) => ({
  components: { VAnswerActions },
  setup() {
    return { args };
  },
  template: '<VAnswerActions v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  created: dayjs().toISOString(),
  deleteTime: 10,
  editTime: 30,
};

export const DeletePassed = Template.bind({});
DeletePassed.args = {
  created: dayjs().toISOString(),
  deleteTime: 0,
  editTime: 30,
};

export const AllPassed = Template.bind({});
AllPassed.args = {
  created: dayjs().toISOString(),
  deleteTime: 0,
  editTime: 0,
};
