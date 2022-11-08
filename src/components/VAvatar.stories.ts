import type { Meta, Story } from '@storybook/vue3';

import Avatar from './Avatar.vue';

export default {
  title: 'UI/Avatar',
  component: Avatar,
} as Meta;

const Template: Story = (args) => ({
  components: { Avatar },
  setup() {
    return { args };
  },
  template: '<Avatar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  name: 'John',
  surname: 'Doe',
};
