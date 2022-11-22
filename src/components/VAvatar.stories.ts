import type { Meta, Story } from '@storybook/vue3';

import VAvatar from '@/components/VAvatar.vue';

export default {
  title: 'UI/VAvatar',
  component: VAvatar,
} as Meta;

const Template: Story = (args) => ({
  components: { VAvatar },
  setup() {
    return { args };
  },
  template: '<VAvatar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  firstName: 'John',
  lastName: 'Doe',
};
