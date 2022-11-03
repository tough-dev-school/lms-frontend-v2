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
        firstName: 'Иван',
        lastName: 'Иванов',
        firstNameEn: 'John',
        lastNameEn: 'Doe',
        gender: 'male',
        linkedinUsername: 'johndoe',
        githubUsername: 'johndoe',
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

export const HomeworkAnswerView = Template.bind({});
HomeworkAnswerView.args = {};
HomeworkAnswerView.decorators = decorate('/homework');

export const HomeworkExpertView = Template.bind({});
HomeworkExpertView.args = {};
HomeworkExpertView.decorators = decorate('/homework');

export const HomeworkQuestionView = Template.bind({});
HomeworkQuestionView.args = {};
HomeworkQuestionView.decorators = decorate('/homework');
