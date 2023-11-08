import type { Meta, StoryFn } from '@storybook/vue3';
import VProfileMenu from '@/components/VProfileMenu/VProfileMenu.vue';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/VProfileMenu',
  component: VProfileMenu,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VProfileMenu },
  setup() {
    const user = useUser();
    user.$patch({
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
