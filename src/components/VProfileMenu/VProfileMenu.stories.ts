import type { Meta, StoryFn } from '@storybook/vue3';

import { VProfileMenu } from '@/components/VProfileMenu';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';

export default {
  component: VProfileMenu,
  title: 'UI/VProfileMenu',
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VProfileMenu },
  setup() {
    const user = useUser();
    user.$patch({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      username: faker.internet.email(),
      uuid: faker.string.uuid(),
    });
    return { args };
  },
  template: '<VProfileMenu v-bind="args" />',
});

export const Default = {
  args: {},
  render: Template,
};
