import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import { faker } from '@faker-js/faker';
import { usersMeRetrieveQueryKey } from '@/api/generated/hooks';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  title: 'UI/VProfileMenu',
  component: VProfileMenu,
  decorators: [
    () => ({
      template: '<div class="flex justify-end"><story /></div>',
    }),
  ],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VProfileMenu },
  setup() {
    const queryClient = useQueryClient();
    queryClient.setQueryData(usersMeRetrieveQueryKey(), {
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
