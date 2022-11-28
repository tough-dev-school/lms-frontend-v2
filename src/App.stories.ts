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
} from './mocks/homework';
import useMaterials from './stores/materials';
import { getMaterial } from './mocks/materials';

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

const setUser = () => {
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
  });
};

const setQuestion = () => {
  const homework = useHomework();

  homework.$patch({
    question: getQuestionData(),
  });
};

const decorate = (initialRoute: string, callback: Function = () => {}) => {
  return [
    (story: InstanceType<typeof App>) => {
      const toasts = useToasts();
      toasts.disable();

      setUser();

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

export const Profile = Template.bind({});
Profile.args = {};
Profile.decorators = decorate('/profile');

export const NotionView = Template.bind({});
NotionView.args = {};
NotionView.decorators = decorate('/materials/1234567890', () => {
  const materials = useMaterials();
  materials.$patch({ material: getMaterial() });
});

export const NotionViewMissing = Template.bind({});
NotionViewMissing.args = {};
NotionViewMissing.decorators = decorate('/materials/1234567890', () => {
  const materials = useMaterials();
  materials.$patch({ material: undefined });
});

export const HomeworkAnswerView = Template.bind({});
HomeworkAnswerView.args = {};
HomeworkAnswerView.decorators = decorate('/homework/answers/1234567890', () => {
  setQuestion();

  const homework = useHomework();
  const answers = [getAnswerData()];
  answers[0].descendants = getAnswersData(3);
  answers[0].descendants[0].descendants = getAnswersData(2);
  answers[0].descendants[0].descendants[0].descendants = getAnswersData(1);
  homework.$patch({
    answers: answers,
  });
});

export const HomeworkExpertView = Template.bind({});
HomeworkExpertView.args = {};
HomeworkExpertView.decorators = decorate(
  '/homework/question-admin/1234567890',
  () => {
    setQuestion();

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
    setQuestion();

    const homework = useHomework();
    const answers = [getAnswerData()];

    homework.$patch({
      answers: answers,
    });
  },
);
