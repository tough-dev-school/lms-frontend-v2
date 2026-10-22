import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VAvatar from '@/components/VAvatar/VAvatar.vue';
import { CLASSMATES, STUDENT } from '@/mocks/users';

export default {
  title: 'UI/VAvatar',
  component: VAvatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
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
    userId: STUDENT.uuid,
  },
};

export const Medium = {
  render: Template,

  args: {
    userId: STUDENT.uuid,
    size: 'md',
  },
};

// Users without a photo get an identicon generated from their id
export const Identicons = {
  render: () => ({
    components: { VAvatar },
    setup() {
      return { users: CLASSMATES };
    },
    template: `
      <div class="flex gap-8">
        <VAvatar v-for="user in users" :key="user.uuid" :user-id="user.uuid" />
      </div>
    `,
  }),
};
