import type { Meta, Story } from '@storybook/vue3';
import App from '@/App.vue';
import vueRouter from 'storybook-vue3-router';
import { routes } from '@/router';
import useUser from '@/stores/user';
import useToasts from '@/stores/toasts';
import useHomework from './stores/homework';
import {
  getAnswerData,
  getQuestionData,
  getAnswersData,
  getThreadData,
  getCommentsData,
} from './mocks/homework';
import useMaterials from './stores/materials';
import { getMaterialsData } from './mocks/materials';
import useStudies from './stores/studies';
import { getStudiesData } from './mocks/studies';

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

const decorate = (initialRoute: string, callback: () => void = () => {}) => {
  return [
    (story: InstanceType<typeof App>) => {
      const toasts = useToasts();
      toasts.disable();

      const user = useUser();
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
        telegramUsername: 'johndoe',
      });

      const homework = useHomework();
      homework.$patch({
        question: getQuestionData(),
      });

      const studies = useStudies();
      studies.$patch({ items: getStudiesData(5, true) });

      const materials = useMaterials();
      materials.$patch({ material: getMaterialsData() });

      callback();

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

export const MailSent = Template.bind({});
MailSent.args = {};
MailSent.decorators = decorate('/login/mail-sent?email=demo@mail.com');

export const Settings = Template.bind({});
Settings.args = {};
Settings.decorators = decorate('/settings');

export const ResetPassword = Template.bind({});
ResetPassword.args = {};
ResetPassword.decorators = decorate('/login/reset');

export const ChangePassword = Template.bind({});
ChangePassword.args = {};
ChangePassword.decorators = decorate(
  '/auth/password/reset/1234567890/1234567890',
);

export const Homepage = Template.bind({});
Homepage.args = {};
Homepage.decorators = decorate('/');

export const NotionView = Template.bind({});
NotionView.args = {};
NotionView.decorators = decorate('/materials/1234567890');

export const NotionViewMissing = Template.bind({});
NotionViewMissing.args = {};
NotionViewMissing.decorators = decorate('/materials/1234567890', () => {
  const materials = useMaterials();
  materials.$patch({ material: undefined });
});

export const HomeworkAnswerView = Template.bind({});
HomeworkAnswerView.args = {};
HomeworkAnswerView.decorators = decorate('/homework/answers/1234567890', () => {
  const homework = useHomework();
  const answers = [getThreadData()];

  answers[0].descendants = getCommentsData(answers[0], 3);
  answers[0].descendants[0].descendants = getCommentsData(
    answers[0].descendants[0],
    2,
  );
  answers[0].descendants[0].descendants[0].descendants = getCommentsData(
    answers[0].descendants[0].descendants[0],
  );
  homework.$patch({
    answers: answers,
  });
});

export const HomeworkExpertView = Template.bind({});
HomeworkExpertView.args = {};
HomeworkExpertView.decorators = decorate(
  '/homework/question-admin/1234567890',
  () => {
    const homework = useHomework();
    const answers = getAnswersData(3);
    homework.$patch({
      answers: answers,
    });
  },
);

export const HomeworkQuestionView = Template.bind({});
HomeworkQuestionView.args = {};
HomeworkQuestionView.decorators = decorate(
  '/homework/questions/1234567890',
  () => {
    const homework = useHomework();
    const answers = [getAnswerData()];
    homework.$patch({
      answers: answers,
    });
  },
);
