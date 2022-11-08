import type { Meta, Story } from '@storybook/vue3';
import ProfileMenu from '@/components/ProfileMenu.vue';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/ProfileMenu',
  component: ProfileMenu,
} as Meta;

const Template: Story = (args) => ({
  components: { ProfileMenu },
  setup() {
    const user = useUser();
    user.$patch({
      username: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    return { args };
  },
  template: '<ProfileMenu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
