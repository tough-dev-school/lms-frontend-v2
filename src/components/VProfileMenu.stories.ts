import type { Meta, Story } from '@storybook/vue3';
import VProfileMenu from '@/components/VProfileMenu.vue';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';

export default {
  title: 'UI/VProfileMenu',
  component: VProfileMenu,
} as Meta;

const Template: Story = (args) => ({
  components: { VProfileMenu },
  setup() {
    const user = useUser();
    user.$patch({
      username: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    });
    return { args };
  },
  template: '<VProfileMenu v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};
