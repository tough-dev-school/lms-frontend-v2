import type { Meta, Story } from '@storybook/vue3';
import App from '@/App.vue';
import vueRouter from 'storybook-vue3-router';
import { routes } from '@/router';
import useUser from '@/stores/user';
import useToasts from '@/stores/toasts';

export default {
  title: 'Pages/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => ({
  components: { App },
  setup() {
    return { args };
  },
  template: '<App v-bind="args" />',
});

const decorate = (initialRoute: string) => {
  return [
    (story: InstanceType<typeof App>) => {
      const user = useUser();
      const toasts = useToasts();

      toasts.disable();

      user.$patch({
        id: '',
        uuid: '',
        username: 'johndoe@demo.com',
        first_name: 'Иван',
        last_name: 'Иванов',
        first_name_en: 'John',
        last_name_en: 'Doe',
        gender: 'male',
        linkedin_username: 'johndoe',
        github_username: 'johndoe',
      });

      return {
        components: { story },
        template: '<story />',
      };
    },
    vueRouter(routes, { initialRoute }),
  ];
};

export const Login = Template.bind({});
Login.args = {};
Login.decorators = decorate('/login');

export const Profile = Template.bind({});
Profile.args = {};
Profile.decorators = decorate('/profile');

export const Homework = Template.bind({});
Homework.args = {};
Homework.decorators = decorate('/homework');