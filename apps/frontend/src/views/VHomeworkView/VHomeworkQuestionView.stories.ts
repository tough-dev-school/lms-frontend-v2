import type { Meta, StoryFn } from '@storybook/vue3-vite';
import VHomeworkQuestionView from './VHomeworkQuestionView.vue';
import { defaultLayoutDecorator } from '@/utils/layoutDecorator';
import {
  createQuestion,
  createModule,
  createQuestionCourse,
  createBreadcrumbs,
  homeworkQuestionsRetrieveQueryKey,
  lmsLessonsRetrieveQueryKey,
} from '@/api/generated';
import { useQueryClient } from '@tanstack/vue-query';
import type { QuestionDetail, Lesson } from '@/api/generated';

export default {
  title: 'App/VHomeworkQuestionView',
  component: VHomeworkQuestionView,
  decorators: [defaultLayoutDecorator],
  parameters: { layout: 'fullscreen' },
  args: {
    questionId: 'react-components',
  },
} as Meta;

// Mock data using existing patterns
const STATIC_QUESTION: QuestionDetail = {
  ...createQuestion(),
  slug: 'react-components',
  name: 'Создание React компонентов',
  markdown_text: `# Задание: Создание React компонентов
  В этом задании вам необходимо создать несколько React компонентов для простого приложения.
  ## Требования:
  - Создайте компонент Header с навигационным меню
  - Реализуйте компонент ProductCard для отображения товара
  - Добавьте обработчики событий для пользовательского взаимодействия
  Убедитесь, что ваш код следует лучшим практикам React и содержит необходимые комментарии.`,
  deadline: '2024-02-15T23:59:00Z',
  homework: {
    is_sent: false,
  },
  breadcrumbs: {
    module: createModule({
      id: 2,
      name: 'React разработка',
    }),
    lesson: {
      id: 2,
    },
    course: {
      ...createBreadcrumbs().course,
      id: 1,
      name: 'Курс веб-разработки',
      slug: 'web-development',
      cover: undefined,
      chat: 'https://t.me/test',
      calendar_ios: 'https://calendar.apple.com/test',
      calendar_google: 'https://calendar.google.com/test',
      homework_check_recommendations:
        'При проверке обратите внимание на структуру компонентов, правильность использования props и читаемость кода.',
    },
  },
  course: {
    ...createQuestionCourse(),
    id: 1,
    name: 'Курс веб-разработки',
    slug: 'web-development',
    homework_check_recommendations:
      'При проверке обратите внимание на структуру компонентов, правильность использования props и читаемость кода.',
  },
};

const STATIC_LESSON: Lesson = {
  id: 2,
  question: createQuestion({
    slug: 'react-components',
    name: 'Создание React компонентов',
    markdown_text:
      '## Создание React компонентов\n\nВыполните задание по созданию React компонентов.',
    deadline: '2024-02-15T23:59:00Z',
  }),
  homework: {
    is_sent: false,
  },
};

const Template: StoryFn = (args) => ({
  components: { VHomeworkQuestionView },
  setup() {
    const queryClient = useQueryClient();

    if (args.question) {
      queryClient.setQueryData(
        homeworkQuestionsRetrieveQueryKey(args.questionId),
        args.question,
      );
    }
    if (args.lesson) {
      queryClient.setQueryData(
        lmsLessonsRetrieveQueryKey(args.lesson.id),
        args.lesson,
      );
    }

    return { args };
  },
  template: '<VHomeworkQuestionView v-bind="args" />',
});

export const Default = {
  render: Template,
  args: {
    question: STATIC_QUESTION,
    lesson: STATIC_LESSON,
  },
};
