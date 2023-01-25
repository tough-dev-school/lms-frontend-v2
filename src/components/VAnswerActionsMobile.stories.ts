import type { Meta, Story } from '@storybook/vue3';
import VAnswerActionsMobile from '@/components/VAnswerActionsMobile.vue';

export default {
  title: 'AnswerActions/VAnswerActionsMobile',
  component: VAnswerActionsMobile,
} as Meta;

const Template: Story = (args) => ({
  components: { VAnswerActionsMobile },
  setup() {
    return { args };
  },
  template: '<VAnswerActionsMobile v-bind="args"/>',
});

export const Default = Template.bind({});
Default.args = {
  allowDelete: true,
  allowEdit: true,
  deleteTime: 10,
  editTime: 30,
};

export const DeletePassed = Template.bind({});
DeletePassed.args = {
  allowDelete: false,
  allowEdit: true,
  deleteTime: 0,
  editTime: 30,
};

export const AllPassed = Template.bind({});
AllPassed.args = {
  allowDelete: false,
  allowEdit: false,
  deleteTime: 10,
  editTime: 30,
};
