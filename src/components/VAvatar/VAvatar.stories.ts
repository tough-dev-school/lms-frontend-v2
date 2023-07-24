import type { Meta, StoryFn } from '@storybook/vue3';

import { VAvatar } from '@/components/VAvatar';
import { faker } from '@faker-js/faker';

export default {
  component: VAvatar,
  title: 'UI/VAvatar',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VAvatar },
  setup() {
    return { args };
  },
  template: '<VAvatar v-bind="args" />',
});

export const Default = {
  args: {
    userId: faker.string.uuid(),
  },

  render: Template,
};
