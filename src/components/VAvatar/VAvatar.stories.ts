import type { Meta, StoryFn } from '@storybook/vue3';

import VAvatar from '@/components/VAvatar.vue';

export default {
  title: 'UI/VAvatar',
  component: VAvatar,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAvatar },
  setup() {
    return { args };
  },
  template: '<VAvatar v-bind="args" />',
});

export const Default = {
  render: Template,

  args: {
    firstName: 'John',
    lastName: 'Doe',
  },
};
