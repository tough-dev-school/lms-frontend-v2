import ProfileMenu from './ProfileMenu.vue';
import useUser from '../stores/user.ts';
import { faker } from '@faker-js/faker';

export default {
  title: 'Basic/ProfileMenu',
  component: ProfileMenu,
};

const Template = (args) => ({
  components: { ProfileMenu },
  setup() {
    const user = useUser();
    user.$patch({
      username: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    });
    return { args };
  },
  template: '<ProfileMenu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
