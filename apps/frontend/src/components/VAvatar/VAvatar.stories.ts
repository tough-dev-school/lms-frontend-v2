import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAvatar from '@/components/VAvatar/VAvatar.vue';
import { faker } from '@faker-js/faker';

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
    userId: faker.string.uuid(),
  },
};
