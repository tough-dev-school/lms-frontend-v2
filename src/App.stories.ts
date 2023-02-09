import type { Meta, Story } from '@storybook/vue3';
import App from '@/App.vue';
import vueRouter from 'storybook-vue3-router';
import { routes } from '@/router';
import useUser from '@/stores/user';
import useToasts from '@/stores/toasts';
import useHomework from './stores/homework';
import {
  getAnswerData,
  getThreadData,
  getCommentData,
  contentHtml,
  getCommentsData,
  answerData,
  authorData,
  questionData,
} from './mocks/homework';
import useMaterials from './stores/materials';
import { getMaterialsData } from './mocks/materials';
import useStudies from './stores/studies';
import { getStudiesData } from './mocks/studies';
import { faker } from '@faker-js/faker';
import merge from 'lodash/merge';
import type { Comment } from '@/types/homework';
import useDiplomas from '@/stores/diplomas';
import { getDiplomasData } from '@/mocks/diplomas';

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

const userId = faker.datatype.uuid();

const decorate = (initialRoute: string, callback: () => void = () => {}) => {
  return [
    (story: InstanceType<typeof App>) => {
      const toasts = useToasts();
      toasts.disable();

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

      const homework = useHomework();
      homework.$patch({
        question: questionData,
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

export const Certificates = Template.bind({});
Certificates.args = {};
Certificates.decorators = decorate('/certificates', () => {
  const diplomas = useDiplomas();
  diplomas.items = getDiplomasData().map((diploma) => {
    diploma.image = 'https://picsum.photos/1480/1048';
    return diploma;
  });
});

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
  const answers = [
    getThreadData(getAnswerData({ content: contentHtml, author: authorData })),
  ];

  const patchComment = (value: Comment): Comment => {
    value.author = authorData;

    return value;
  };

  const getBranch = () => {
    const level1 = [getCommentData(answers[0])].map(patchComment)[0];
    const level2 = getCommentsData(level1, 2).descendants.map(patchComment);
    const level3 = getCommentsData(level2[0], 2).descendants.map(patchComment);

    level1.descendants = level2;
    level2[0].descendants = level3;

    return level1;
  };

  answers[0].descendants = [
    // comment with formatting
    {
      ...getCommentData(answers[0]),
      ...getAnswerData({ content: contentHtml, author: authorData }),
    },
    // own comment
    {
      ...getCommentData(answers[0]),
      author: { ...authorData, uuid: userId },
    },
    // comment branch
    getBranch(),
  ];

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
    const answers = [
      answerData,
      merge({}, answerData, { hasDescendants: true }),
    ];

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
    const answers = [
      merge({}, answerData, {
        author: {
          ...authorData,
          uuid: userId,
        },
        slug: '36072121-e029-43cc-9c10-80ee4388c632',
      }),
    ];
    homework.$patch({
      answers: answers,
    });
  },
);
