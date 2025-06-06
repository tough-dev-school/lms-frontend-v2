import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import { faker } from '@faker-js/faker';
import { userKeys } from '@/query';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'UI/VProfileMenu',
  component: VProfileMenu,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VProfileMenu },
  setup() {
    const queryClient = useQueryClient();
    queryClient.setQueryData(userKeys.me(), {
      username: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      uuid: faker.string.uuid(),
    });
    return { args };
  },
  template: '<VProfileMenu v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {},
};
