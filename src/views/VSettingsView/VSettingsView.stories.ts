import type { Meta, StoryFn } from '@storybook/vue3';
import VSettingsView from './VSettingsView.vue';
import useUser from '@/stores/user';
import { faker } from '@faker-js/faker';

export default {
  title: 'App/VSettingsView',
  component: VSettingsView,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { VSettingsView },
  setup() {
    const userId = faker.datatype.uuid();

    const user = useUser();
    user.$patch({
      id: '',
      uuid: userId,
      username: 'johndoe@demo.com',
      firstName: 'Иван',
      lastName: 'Иванов',
      firstNameEn: 'John',
      lastNameEn: 'Doe',
      gender: 'male',
      linkedinUsername: 'johndoe',
      githubUsername: 'johndoe',
      telegramUsername: 'johndoe',
    });

    return { args };
  },
  template: '<VSettingsView v-bind="args" />',
});

export const Default = {
  render: Template,
};
